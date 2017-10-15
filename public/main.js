/**
 * Project TRA
 * Main Entry point for TRA SPA
 *
 * Copyright (c) 2017
 */
import _ from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { syncHistoryWithStore } from 'react-router-redux';

import actions from 'actions';
import store from 'reduxStore';

import Home from 'components/home/Home';
import YourRecs from 'components/yourRecs/YourRecs';

import AuthGateway from 'containers/AuthGateway';

import 'scss/bootstrap-sass/stylesheets/_bootstrap.scss';
import 'scss/dino.scss';

// global convenience helpers
window._ = _;
window.store = store;

async function init() {
  const user = await store.dispatch(actions.user.fetchUser());

  const routes = (
    <Route>
      <Route path="/" component={AuthGateway}>
        <IndexRoute component={Home} />
          <Route path="/add-recs" component={YourRecs} />
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
}

init();
