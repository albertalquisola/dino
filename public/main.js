/**
 * Project TRA
 * Main Entry point for TRA SPA
 *
 * Copyright (c) 2017
 */
import _ from 'lodash';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { ScrollContext } from 'react-router-scroll-4';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import actions from 'actions';
import reducers from 'reducers';

import Home from 'components/home/Home';
import FriendRecs from 'components/friendRecs/FriendRecs';
import MyRecs from 'components/myRecs/myRecs';
import AddRecs from 'components/addRecs/AddRecs';

import 'scss/bootstrap-sass/stylesheets/_bootstrap.scss';
// import 'scss/materialize.min.css';
// import 'js/materialize.min.js';
import 'scss/dino.scss';


const history = createHistory();
const store = createStore(
  combineReducers({ ...reducers, router: routerReducer }),
  applyMiddleware(reduxThunk, routerMiddleware(history))
);

// global convenience helpers
window._ = _;
window.store = store;

async function init() {
  await store.dispatch(actions.user.fetchUser());

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ScrollContext>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/recommendations" component={MyRecs} />
            <Route exact path="/recommendations/add" component={AddRecs} />
            <Route exact path="/friends/recommendations" component={FriendRecs} />
          </Switch>
        </ScrollContext>
      </ConnectedRouter>
    </Provider>
  , document.getElementById('mount'));
}

init();
