import reduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';

import reducers from 'reducers';

const store = createStore(
  combineReducers({ ...reducers, routing: routerReducer }),
  applyMiddleware(reduxThunk)
);

export default store;
