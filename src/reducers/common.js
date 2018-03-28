const defaultState = {
    appName: 'Conduit',
    token: null
};

export default (state = defaultState, action) => {
    switch(action.type) {
        case 'APP_LOAD':
            return {
                ...state,
                // Q: shouldn't this be in the 'user' object? A: Gets reduced by the LOGIN reducer
                token: action.token || null,
                appLoaded: true,
                currentUser: action.payload ? action.payload.user : null
            };
        case 'REDIRECT':
            console.log("REDIRECT reduced", state);
            return {
                ...state,
                redirectTo: null
            };

        // NOTE: this action type is also in auth.js.
        // what this means is that there are multiple reducers watching
        // for the action, and it updates its state in the ways that
        // makes sense for the different reducers.
        case 'LOGIN':
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                // TODO what is the point of this if agent has it
                // and it's already in the local storage?
                token: action.error ? null : action.payload.user.token,
                currentUser: action.error ? null : action.payload.user
            };
    }
    return state;
};