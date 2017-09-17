/**
 * Project TRA
 * Main Entry point for TRA SPA
 *
 * Copyright (c) 2017
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { syncHistoryWithStore } from 'react-router-redux';

import store from 'reduxStore';

import AuthGateway from 'containers/AuthGateway';
import HomeContainer from 'containers/Home';

import 'scss/bootstrap-sass/stylesheets/_bootstrap.scss';
import 'scss/stag.scss';

// global convenience helpers
window.$ = require('jquery');
window._ = require('lodash');

const routes = (
  <Route>
    <Route path="/" component={AuthGateway}>
      <IndexRoute component={HomeContainer} />
    </Route>
  </Route>
);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router routes={routes} render={applyRouterMiddleware(useScroll())} history={history} />
  </Provider>,
  document.getElementById('mount')
);
