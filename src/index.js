import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';
import Home from './components/Home';
import Login from './components/Login';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      {/* TODO try not passing and just importing in App.js */}
      <Route path="/" component={App} router={Router}>
        <IndexRoute component={Home} />
        <Route path="login" component={Login} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
