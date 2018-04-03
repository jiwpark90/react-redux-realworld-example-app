// this is the version that supports promises
import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

// TODO test with my node backend
const API_ROOT = 'https://conduit.productionready.io/api';

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

// endpoints
const Articles = {
    all: (page) => {
        return requests.get(`/articles?limit=10`);
    },
    get: (slug) => {
        return requests.get(`/articles/${slug}`);
    },
    del: (slug) => {
        return requests.del(`/articles/${slug}`);
    },
    byAuthor: (author, page) => {
        // TODO what is encodeURIComponent??
        return requests.get(`/articles?author=${encodeURIComponent(author)}&limit=5`)
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
    setToken
};