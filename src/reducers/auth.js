export default (state = {}, action) => {
    switch(action.type) {
        // TODO probably better to rename to 'LOGGED_IN'
        case 'LOGIN':
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