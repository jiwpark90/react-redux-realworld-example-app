import App from './components/App';
import { Provider } from 'react-redux';

import ReactDOM from 'react-dom';
import React from 'react';
// 1. import createStore
import { createStore } from 'redux';

const defaultState = { 
  appName: 'conduit',
  articles: null
};
// 2. define reducer
const reducer = function(state = defaultState, action) {
  return state;
}
// 3. create store (has 3 important functions):
  // a. subscribe
  // b. dispatch
  // c. getstate
const store = createStore(reducer);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
