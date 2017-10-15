import express from 'express';

import list from './list';
import recommendedList from './recommendedList';
import recommendation from './recommendation';
import userList from './userList';
import user from './user';

const apiRouter = express.Router();

export default (app, mw) => {
  app.use(
    '/api/v1',
    mw.auth.isAuthenticated,
    apiRouter,
  );

  return {
    list: list(mw, apiRouter),
    user: user(mw, apiRouter),
    userList: userList(mw, apiRouter),
    recommendation: recommendation(mw, apiRouter),
    recommendedList: recommendedList(mw, apiRouter),
  };
};
