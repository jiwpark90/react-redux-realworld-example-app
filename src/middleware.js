import agent from './agent';

// if action has a payload that is a promise,
// resolve the promise and dispatch a new action with the results
const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
        store.dispatch({
            type: 'ASYNC_START',
            subtype: action.type
        });
        action.payload.then(
            (res) => {
                action.payload = res;
                store.dispatch(action);
            },
            (error) => {                
                action.error = true;
                action.payload = error.response.body;
                store.dispatch(action);
            }
        );
        
        return;
    }

    // pass off to the next middleware in chain
    next(action);
};

function isPromise(v) {
    return v && typeof v.then === 'function';
}

const localStorageMiddleware = store => next => action => {
    if (action.type === 'REGISTER' || action.type === 'LOGIN') {
        if (!action.error) {
            window.localStorage.setItem('jwt', action.payload.user.token);
            // use token in the requests going forward
            agent.setToken(action.payload.user.token);
        }
    } else if (action.type === 'LOGOUT') {
        // TODO is this the proper way to 'unset'? no separate API?
        window.localStorage.setItem('jwt', '');
        agent.setToken(null);
    }

    next(action);
}

export {
    localStorageMiddleware,
    promiseMiddleware
};