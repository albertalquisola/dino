import express from 'express';

import user from './user';

const apiRouter = express.Router();

export default (app, mw) => {
  app.use(
    '/api/v1',
    mw.auth.isAuthenticated,
    apiRouter,
  );

  return {
    user: user(mw, apiRouter),
  };
};
