// 1. import
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';
import settings from './reducers/settings';

// 2. define a reducer from separated reducers
const reducer = combineReducers({
    auth,
    common,
    home,
    settings
});

// 3. define any middleware
// TODO order is important?
const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware);

// 4. create store (has 3 important functions):
// a. subscribe
// b. dispatch
// c. getstate
const store = createStore(reducer, middleware);

export default store;