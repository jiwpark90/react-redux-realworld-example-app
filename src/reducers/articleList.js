'use strict';

export default (state = {}, action) => {
    switch(action.type) {
        case 'HOME_PAGE_LOADED':
            return {
                ...state,
                articles: action.payload.articles,
                articlesCount: action.payload.articlesCount
            };
        case 'HOME_PAGE_UNLOADED':
            return {};
        // this action is dispatched from the Profile component.
        // it dispatches with 0th promise being a call to get profile
        // and 1th promise being a call to get artcielist for that user.
        // in the articleList reducer, only deal with articlelist
        case 'PROFILE_PAGE_LOADED':
        case 'PROFILE_FAVORITES_PAGE_LOADED':
            return {
                ...state,
                articles: action.payload[1].articles,
                articlesCount: action.payload[1].articlesCount
            };
        case 'PROFILE_PAGE_UNLOADED':
        case 'PROFILE_FAVORITES_PAGE_UNLOADED':
            return {};
    }
    return state;
};