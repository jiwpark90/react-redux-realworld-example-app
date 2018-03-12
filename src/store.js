// 1. import
import { createStore, applyMiddleware } from 'redux';
import { promiseMiddleware } from './middleware';

const defaultState = {
    appName: 'conduit',
    // note that this gets used in MainView as the state
    articles: null
};
// 2. define reducer
const reducer = function (state = defaultState, action) {
    switch (action.type) {
        case 'HOME_PAGE_LOADED':
            return {
                ...state,
                articles: action.payload.articles
            };
    }
    return state;
}

const middleware = applyMiddleware(promiseMiddleware);
// 3. create store (has 3 important functions):
// a. subscribe
// b. dispatch
// c. getstate
const store = createStore(reducer, middleware);

export default store;