import express from 'express';

const usersRouter = express.Router();

export default (mw, apiRouter) => {
  apiRouter.use(
    '/users',
    usersRouter,
  );

  usersRouter.get(
    '/',
    mw.user.getUser,
  );

  return usersRouter;
};
