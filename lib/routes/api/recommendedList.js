import express from 'express';

const recommendedListRouter = express.Router();

export default (mw, apiRouter) => {
  apiRouter.use(
    '/recommended-lists',
    recommendedListRouter,
  );

  recommendedListRouter.get(
    '/',
    mw.recommendedList.getLists,
  );

  recommendedListRouter.post(
    '/',
    mw.recommendedList.createList,
  );
};
