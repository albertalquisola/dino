import express from 'express';

const userListRouter = express.Router();

export default (mw, apiRouter) => {
  apiRouter.use(
    '/user-lists',
    userListRouter,
  );

  userListRouter.get(
    '/',
    mw.userList.getLists,
  );

  userListRouter.get(
    '/:id',
    mw.userList.getLists,
  );

  userListRouter.post(
    '/',
    mw.userList.createList,
  );

  return userListRouter;
};
