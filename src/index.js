import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
