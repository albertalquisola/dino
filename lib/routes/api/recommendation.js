import express from 'express';

const recommendationRouter = express.Router();

export default (mw, apiRouter) => {
  apiRouter.use(
    '/recs',
    recommendationRouter,
  );

  recommendationRouter.post(
    '/',
    mw.recommendation.createRec,
  );
};
