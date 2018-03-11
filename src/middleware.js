// if action has a payload that is a promise,
// resolve the promise and dispatch a new action with the results
const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
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
        // TODO don't we want to call next?
        // is this because .dispatch() was called?
        return;
    }

    // pass off to the next middleware in chain
    next(action);
};

function isPromise(v) {
    return v && typeof v.then === 'function';
}

export {
    promiseMiddleware
};