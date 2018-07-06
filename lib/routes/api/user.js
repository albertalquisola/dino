import express from 'express';

const usersRouter = express.Router();

export default (mw, apiRouter) => {
  apiRouter.use(
    '/users',
    usersRouter,
  );

  /* user recommendations */
  usersRouter.get(
    '/:userId/recommendations',
    mw.auth.isUser,
    mw.recommendation.getUserRecommendations,
  );

  usersRouter.post(
    '/:userId/recommendations',
    mw.auth.isUser,
    mw.recommendation.createRec,
  );

  /* user's friends' recommendations */
  usersRouter.get(
    '/:userId/friends-recommendations',
    mw.recommendation.getFriendsRecommendationsForCity,
  );

  /* user */
  usersRouter.get(
    '/',
    mw.user.getUser,
  );

  return usersRouter;
};
