import _ from 'lodash';

import models from 'models';
import User from 'isomorphic/models/User';
import Logger from 'util/Logger';

const log = new Logger('services/recommendation');

async function getFriendsRecommendationsForCity(userId, cityId) {
  try {
    return await models.recommendation.getFriendsRecommendationsForCity(userId, cityId);

  } catch (error) {
    throw error;
  }
}

async function getUserRecommendations(userId) {
  try {
    const recommendations = await models.recommendation.getUserRecommendations(userId);
    return _.map(recommendations, rec => {
      rec.googlePlaceData = JSON.parse(rec.googlePlaceData);
      rec.yelpPlaceData = JSON.parse(rec.yelpPlaceData);

      return rec;
    });

  } catch (error) {
    log.error('getUserRecommendations', `error getting user recommendations for userId: ${userId}`, { error, userId });
    throw error;
  }
}

async function createRec(placeId, userId) {
  try {
    return await models.recommendation.createRec(placeId, userId);

  } catch (error) {
    log.error('createRec', 'error creating rec from recommendation service', { error });
    throw error;
  }
}

function groupRecsByPlace(recommendations) {
  const groupedRecs = {};

  _.each(recommendations, (rec) => {
    const user = new User(rec);

    rec.googlePlaceData = JSON.parse(rec.googlePlaceData);
    rec.yelpPlaceData = JSON.parse(rec.yelpPlaceData);

    if (!groupedRecs[rec.googlePlaceId]) {
      groupedRecs[rec.googlePlaceId] = { place: rec, friends: [user], count: 1 };

    } else {
      groupedRecs[rec.googlePlaceId].friends.push(user);
      groupedRecs[rec.googlePlaceId].count++;
    }
  });

  return _.values(groupedRecs);
}

export default {
  getFriendsRecommendationsForCity,
  getUserRecommendations,
  groupRecsByPlace,
  createRec,
};
