// this is the version that supports promises
import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

// TODO test with my node backend
const API_ROOT = 'https://conduit.productionready.io/api'
// const API_ROOT = 'https://realworldapp.herokuapp.com/api';

// initialize the agent
const superagent = superagentPromise(_superagent, global.Promise);

// only interested in the body of the response
const responseBody = response => response.body;

const requests = {
    get: (url) => {
        // TODO no catch? is that to let it propagate up to the caller? TEST
        return superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody);
    },
    post: (url, body) => {
        return superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody);
    },
    put: (url, body) => {
        return superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody);
    },
    del: (url, body) => {
        return superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody);
    }
}

const limit = (count, p) => 
    `limit=${count}&offset=${p ? p * count : 0}`;
// TODO what is encodeURIComponent??
const encode = encodeURIComponent;
const omitSlug = article =>
    Object.assign({}, article, { slug: undefined });

// endpoints
const Articles = {
    all: (page) => {
        return requests.get(`/articles?${limit(10, page)}`);
    },
    byAuthor: (author, page) => {
        return requests.get(`/articles?author=${encode(author)}&${limit(10, page)}`)
    },
    byTag: (tag, page) => {
        return requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`);
    },
    del: (slug) => {
        return requests.del(`/articles/${slug}`);
    },
    favoritedBy: (author, page) => {
        return requests.get(`/articles?favorited=${encode(author)}&${limit(10, page)}`);
    },
    feed: (page) => {
        return requests.get(`/articles/feed?${limit(10, page)}`);
    },
    get: (slug) => {
        return requests.get(`/articles/${slug}`);
    },
    update: article => {
        return requests.put(`/articles/${ article.slug }`,
            { article: omitSlug(article) });
    },
    create: article => {
        return requests.post('/articles', { article });
    }
};

const Profile = {
    follow: username => {
        return requests.post(`/profiles/${username}/follow`);
    },
    get: username => {
        return requests.get(`/profiles/${username}`);
    },
    unfollow: username => {
        return requests.del(`/profiles/${username}/follow`);
    }
};

const Comments = {
    forArticle: slug => {
        return requests.get(`/articles/${slug}/comments`);
    },
    create: (slug, comment) => {
        return requests.post(`/articles/${slug}/comments`, { comment });
    },
    delete: (slug, commentId) => {
        return requests.del(`/articles/${slug}/comments/${commentId}`);
    }
}

const Auth = {
    login: (email, password) => {
        return requests.post('/users/login', { user: { email, password }});
    },
    current: () => {
        return requests.get('/user');
    },
    register: (username, email, password) => {
        return requests.post('/users', { user: { username, email, password}});
    },
    save: user => {
        return requests.put('/user', { user })
    }
};

const Tags = {
    getAll: () => {
        return requests.get(`/tags`);
    }
};

let token = null;
// this kicks in on the way to make the request
const tokenPlugin = (req) => {
    if (token) {
        req.set('authorization', `Token ${token}`);
    }
}
const setToken = (_token) => {
    token = _token
}

// export all endpoints
export default {
    Articles,
    Auth,
    Comments,
    Profile,
    Tags,
    setToken
};
