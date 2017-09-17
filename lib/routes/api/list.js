import express from 'express';

const listRouter = express.Router();

export default (mw, apiRouter) => {
  apiRouter.use(
    '/lists',
    listRouter,
  );

  listRouter.get(
    '/',
    mw.list.getLists,
  );
};
