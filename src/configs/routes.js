require('babel/register');

import React from 'react';
import {Route, DefaultRoute} from 'react-router';
var App = require('../views/app.jsx');

export default (
  <Route path="/" handler={App}>
    <Route
      path="about"
      handler={require('../views/general/about.jsx')} />
    <Route
      path="user/register"
      handler={require('../views/user/register.jsx')} />
    <Route
      path="user/login"
      handler={require('../views/user/login.jsx')} />
    <Route
      path="user/profile"
      handler={require('../views/user/profile.jsx')} />
    <Route
      path="todo"
      handler={require('../views/general/todo.jsx')} />
    <DefaultRoute
      handler={require('../views/general/home.jsx')} />
  </Route>
);