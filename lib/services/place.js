import models from 'models';
import Logger from 'util/Logger';

const log = new Logger('services/place');

async function addPlace(place, googlePlaceId) {
  place = JSON.stringify(place);
  
  try {
    return await models.place.addPlace(place, googlePlaceId);

  } catch (error) {
    log.error('addPlace', 'error adding place from places service', { error, place, googlePlaceId });
    throw error;
  }
}

export default {
  addPlace,
};
