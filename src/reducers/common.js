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
            return {
                ...state,
                redirectTo: null
            };

        // below two are dispatched by the settings component
        case 'LOGOUT':
            return {
                ...state,
                redirectTo: '/',
                token: null,
                currentUser: null
            };
        case 'SETTINGS_SAVED':
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                currentUser: action.error ? null : action.payload.user
            };
        
        // dispatched by editor. redirect only if successful
        case 'ARTICLE_SUBMITTED':
            if (action.error)
                break;
            const redirectUrl = `article/${action.payload.article.slug}`;
            return { ...state, redirectTo: redirectUrl };
            
        // called from article
        case 'DELETE_ARTICLE':
            return {
                ...state,
                redirectTo: '/'
            };

        // NOTE: this action type is also in auth.js.
        // what this means is that there are multiple reducers watching
        // for the action, and it updates its state in the ways that
        // makes sense for the different reducers.
        case 'LOGIN':
        case 'REGISTER':
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                // Q: What is the point of this if agent has it
                // and it's already in the local storage?
                token: action.error ? null : action.payload.user.token,
                currentUser: action.error ? null : action.payload.user
            };
    }
    return state;
};