import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
// 1. import stuff from redux
import { createStore, applyMiddleware } from 'redux';
import { promiseMiddleware } from './middleware';
import App from './components/App';

const defaultState = { 
  appName: 'conduit',
  // note that this gets used in MainView as the state
  articles: null
};
// 2. define reducer
const reducer = function(state = defaultState, action) {
  switch(action.type) {
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        articles: action.payload.articles
      };
  }
  return state;
}
// 3. create store (has 3 important functions):
  // a. subscribe
  // b. dispatch
  // c. getstate
const store = createStore(reducer, applyMiddleware(promiseMiddleware));

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
