import _ from 'lodash';
import redisClient from 'util/redisClient';
import yelp from 'yelp-fusion';

import { getLocationDetail } from 'util/location';
import { CITY, STATE, COUNTRY, POSTAL_CODE } from 'enums';

import Logger from 'util/Logger';

const log = new Logger('services/yelp');
let yelpClient;

initializeYelpClient();

async function getData(place) {
  if (!yelpClient)
    throw new Error('yelp client not initialized!');

  try {
    const businessId = await getBusinessId(place);
    return businessId ? await getBusiness(businessId) : null;

  } catch (error) {
    log.error('getData', 'error doing business match, attempting to do business search', { error, place });
  }
}

async function getBusiness(businessId) {
  try {
    const response = await yelpClient.business(businessId);
    return _.get(response, 'jsonBody');

  } catch (error) {
    log.error('error getting yelp business data', { error, businessId });
    throw error;
  }
}

async function getBusinessId(place) {
  let businesses;

  try {
    businesses = await doBusinessMatch(place);
    if (!_.isEmpty(businesses))
      return _.first(businesses).id;

  } catch (error) {
    // log the error but do not throw
    // instead proceed to next try/catch block and try and do a business search
    log.error('getBusinessId', 'error trying to do a business match', { error, place });
  }

  try {
    businesses = await doBusinessSearch(place);
    if (!_.isEmpty(businesses))
      return _.first(businesses).id;

  } catch (error) {
    log.error('getBusinessId', 'error trying to do a business search', { error, place });
    throw error;
  }
}

async function doBusinessMatch(place) {
  const businessMatchQuery = buildBusinessMatchQuery(place);

  try {
    const response = await yelpClient.businessMatch('best', businessMatchQuery);
    return _.get(response, 'jsonBody.businesses');

  } catch (error) {
    log.error('doBusinessMatch', 'error doing yelp business match', { error, place });
    throw error;
  }
}

async function doBusinessSearch(place) {
  // remove non ascii characters for more accurate search results
  const sanitizedPlaceName = _.trim(place.name.replace(/[^\x00-\x7F]/g, ''));
  const searchArgs = { term: sanitizedPlaceName };
  const { lat, lng } = _.get(place, 'geometry.location');
  searchArgs.latitude = typeof lat === 'function' ? lat() : lat;
  searchArgs.longitude = typeof lng === 'function' ? lng() : lng;

  try {
    const response = await yelpClient.search(searchArgs);
    return _.get(response, 'jsonBody.businesses');

  } catch (error) {
    log.error('doBusinessSearch', 'error doing yelp business search', { error, place });
    throw error;
  }
}

function buildBusinessMatchQuery(place) {
  const cityDetails = getLocationDetail(place, CITY);
  const stateDetails = getLocationDetail(place, STATE);
  const countryDetails = getLocationDetail(place, COUNTRY);
  const postalCodeDetails = getLocationDetail(place, POSTAL_CODE);
  const { lat, lng } = _.get(place, 'geometry.location');

  // remove non ascii characters for more accurate search results
  const sanitizedPlaceName = _.trim(place.name.replace(/[^\x00-\x7F]/g, ''));
  const searchArgs = { name: sanitizedPlaceName, city: cityDetails.long_name };

  searchArgs.latitude = typeof lat === 'function' ? lat() : lat;
  searchArgs.longitude = typeof lng === 'function' ? lng() : lng;

  if (place.formatted_address)
    searchArgs.address1 = place.formatted_address;

  if (place.formatted_phone_number)
    searchArgs.phone = place.formatted_phone_number.replace(/\D+/g, '');

  if (countryDetails)
    searchArgs.country = countryDetails.short_name;

  if (stateDetails)
    searchArgs.state = stateDetails.short_name;

  if (postalCodeDetails)
    searchArgs.postal_code = postalCodeDetails.long_name;

  return searchArgs;
}

async function initializeYelpClient() {
  try {
    const token = await redisClient.get('yelpAccessToken');
    yelpClient = yelp.client(token);

  } catch (error) {
    log.error('initializeYelpClient', 'error initializing yelp client', { error });
    throw error;
  }
}


export default {
  getData,
};
