import _ from 'lodash';

import models from 'models';
import Logger from 'util/Logger';

const log = new Logger('services/place');

async function addPlace(cityId, place, googlePlaceId, yelpData) {
  const placeName = place.name;

  if (_.isPlainObject(place))
    place = JSON.stringify(place);

  if (_.isPlainObject(yelpData))
    yelpData = JSON.stringify(yelpData);

  try {
    return await models.place.addPlace(placeName, cityId, place, googlePlaceId, yelpData);

  } catch (error) {
    log.error('addPlace', 'error adding place from places service', { error, place, googlePlaceId });
    throw error;
  }
}

export default {
  addPlace,
};
