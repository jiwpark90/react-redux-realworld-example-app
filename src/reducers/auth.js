const defaultState = {
    email: '',
    password: '',
    inProgress: false
}

export default (state = defaultState, action) => {
    switch(action.type) {
        // TODO probably better to rename to 'LOGGED_IN'
        // NOTE: this action type is also in common.js.
        // what this means is that there are multiple reducers watching
        // for the action, and it updates its state in the ways that
        // makes sense for the different reducers.
        case 'LOGIN':
        case 'REGISTER':
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null
            };
        case 'ASYNC_START':
            if (action.subtype === 'LOGIN' || action.subtype === 'REGISTER') {
                return {
                    ...state,
                    inProgress: true
                };
            }
            break;
        case 'UPDATE_FIELD_AUTH':
            return {
                ...state,
                // computed property name
                [action.key]: action.value
            };
    }
    return state;
};