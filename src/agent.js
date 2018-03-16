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
    }
}

// endpoint
const Articles = {
    all: (page) => {
        return requests.get(`/articles?limit=10`);
    }
};

const Auth = {
    login: (email, password) => {
        return requests.post('/users/login', { user: { email, password }});
    },
    current: () => {
        return requests.get('/user');
    }
};

let token = null;
// TODO is plugin a super agent concept? middleware for it?
let tokenPlugin = (req) => {
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
    setToken
};