import coordinators from 'coordinators';
import Logger from 'util/Logger';

const log = new Logger('mw/recommendation');

async function getFriendsRecommendationsForCity(req, res, next) {
  const userId = req.params.userId;
  const googlePlaceId = req.query.placeId;
  if (!userId || !googlePlaceId)
    return next(new Error('need user ID and google place ID to get friend recommendations'));

  try {
    const friendRecommendations = await coordinators.rec.getFriendsRecommendationsForCity(userId, googlePlaceId);
    return res.json({ friendRecommendations });

  } catch (error) {
    return next(error);
  }
}

async function getUserRecommendations(req, res, next) {
  const userId = req.params.userId;

  if (!userId)
    return next(new Error('no user ID provided when fetching user recommendations'));

  try {
    const response = await coordinators.rec.getUserRecommendations(userId);
    return res.json({ recommendations: response });

  } catch (error) {
    return next(error);
  }
}

async function createRec(req, res, next) {
  if (!req.body.recommendation)
    return next(new Error('recommendation body is empty'));

  if (!req.body.placeId)
    return next(new Error('missing place id'));

  const { placeId, recommendation } = req.body;
  const userId = req.user.id;

  try {
    const response = await coordinators.rec.createRec(recommendation, placeId, userId);
    return res.json({ recommendation: response });

  } catch (error) {
    return next(error);
  }
}

export default {
  getFriendsRecommendationsForCity,
  getUserRecommendations,
  createRec,
};
