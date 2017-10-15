import services from 'services';
import Logger from 'util/Logger';

const log = new Logger('coordinators/rec');

async function createRec(place, googlePlaceId, userId) {
  try {
    const placeId = await services.place.addPlace(place, googlePlaceId);
    await services.recommendation.createRec(placeId, userId);

  } catch (error) {
    log.error('createRec', 'error creating recommendation', { error, place, googlePlaceId, userId });
    throw error;
  }

  return place;
}

export default {
  createRec,
};

