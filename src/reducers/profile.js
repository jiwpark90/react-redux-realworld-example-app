export default (state = {}, action) => {
    switch (action.type) {
        // this action is dispatched from the Profile component.
        // it dispatches with 0th promise being a call to get profile
        // and 1th promise being a call to get artcielist for that user.
        // in the profile reducer, only deal with profile
        case 'PROFILE_PAGE_LOADED':
            return {
                ...action.payload[0].profile
            };
        case 'PROFILE_PAGE_UNLOADED':
            return {};

        // the agent calls to these methods return a profile
        case 'FOLLOW_USER':
        case 'UNFOLLOW_USER':
            return {
                ...action.payload.profile
            };
    }

    return state;
};