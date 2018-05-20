import _ from 'lodash';
import async from 'async';

import GoogleMaps from '@google/maps';
import { CITY } from 'enums';
import models from 'models';
import { getLocationDetail } from 'util/location';
import Logger from 'util/Logger';

const log = new Logger('services/city');
const googleMapsClient = GoogleMaps.createClient({ key: process.env.GOOGLE_API_KEY });

async function getCityByGooglePlaceId(googlePlaceId) {
  try {
    return await models.city.getCityByGooglePlaceId(googlePlaceId);

  } catch (error) {
    log.error('getCityByGooglePlaceId', 'error getting city using google place ID', { error, googlePlaceId });
    throw error;
  }
}

async function getCorrespondingCityForPlace(place) {
  return new Promise((resolve, reject) => {
    async.waterfall([
      function getCorrespondingCity(callback) {
        const cityDetails = getLocationDetail(place, CITY);
        const cityQuery = cityDetails.long_name;

        const query = {
          input: cityQuery,
          types: '(cities)',
          radius: 10000,
          strictbounds: true,
          location: {
            lat: place.geometry.location.lat || place.geometry.location.latitude,
            lng: place.geometry.location.lng || place.geometry.location.longitude,
          },
        };

        googleMapsClient.placesAutoComplete(query, (error, response) => {
          let errorMsg;

          if (error) {
            errorMsg = 'error getting city search results';
            log.error('getCorrespondingCityForPlace', errorMsg, { error, place });
            return callback(new Error(errorMsg));
          }

          if (response.status !== 200) {
            errorMsg = 'bad status code from google when finding corresponding city for place';
            log.error('getCorrespondingCityForPlace', errorMsg, { response, place });
            return callback(new Error(errorMsg));
          }

          // right now, there's no good way to guarantee we have the right city :(
          // log that we got more than 1 result and optimistically choose the 1st city as the most relevant
          if (response.json.predictions.length !== 1) {
            errorMsg = 'got more than 1 search result when trying to find corresponding city for place!';
            log.warn('getCorrespondingCityForPlace', errorMsg, { response, place });
          }

          return callback(null, _.first(response.json.predictions).place_id);
        });
      },

      function getCityDetails(placeId, callback) {
        googleMapsClient.place({ placeid: placeId }, (error, response) => {
          if (error) {
            log.error('getCityDetails', 'error getting corresponding city details for place', { error });
            return callback(error);
          }

          return callback(null, response.json.result);
        });
      },
    ], (error, city) => {
      if (error) {
        log.error('getCorrespondingCity', 'error getting corresponding city', { error });
        return reject(error);
      }

      return resolve(city);
    });
  });
}

async function upsertCity(city, countyId) {
  try {
    const cityDetails = getLocationDetail(city, CITY);
    const cityName = cityDetails.long_name;
    const googlePlaceId = city.place_id;

    if (_.isPlainObject(city))
      city = JSON.stringify(city);

    return await models.city.upsertCity(cityName, countyId, city, googlePlaceId);

  } catch (error) {
    log.error('upsertCity', 'error upserting city', { error, city, countyId });
    throw error;
  }
}

export default {
  upsertCity,
  getCityByGooglePlaceId,
  getCorrespondingCityForPlace,
};
