import services from 'services';
import Logger from 'util/Logger';

const log = new Logger('coordinators/rec');

async function getUserRecommendations(userId) {
  try {
    return await services.recommendation.getUserRecommendations(userId);

  } catch (error) {
    log.error('getUserRecommendations', `error fetching user recommendations for id: ${userId}`, { error, userId });
    throw error;
  }
}

async function getFriendsRecommendationsForCity(userId, googlePlaceId) {
  try {
    const cityId = await services.city.getCityByGooglePlaceId(googlePlaceId);
    if (!cityId)
      return [];

    const friendsRecommendations = await services.recommendation.getFriendsRecommendationsForCity(userId, cityId);
    return services.recommendation.groupRecsByPlace(friendsRecommendations);

  } catch (error) {
    log.error('getFriendsRecommendationsForCity', `error getting friends recommendations for user with ID: ${userId}`, { error, userId, googlePlaceId });
    throw error;
  }
}

async function createRec(place, googlePlaceId, userId) {
  try {
    const yelpData = await services.yelp.getData(place);
    const correspondingCity = await services.city.getCorrespondingCityForPlace(place);
    const countyId = await services.county.upsertCountyFromCity(correspondingCity);
    const cityId = await services.city.upsertCity(correspondingCity, countyId);
    const placeId = await services.place.addPlace(cityId, place, googlePlaceId, yelpData);
    await services.recommendation.createRec(placeId, userId);

  } catch (error) {
    log.error('createRec', 'error creating recommendation', { error, place, googlePlaceId, userId });
    throw error;
  }

  return place;
}

export default {
  getFriendsRecommendationsForCity,
  getUserRecommendations,
  createRec,
};

