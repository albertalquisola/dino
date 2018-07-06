import _ from 'lodash';

import db from 'models/db';
import Logger from 'util/Logger';

const log = new Logger('models/city');

async function getCityByGooglePlaceId(googlePlaceId) {
  const sql = `SELECT id FROM cities WHERE googlePlaceId = ?`;
  const params = [googlePlaceId];

  try {
    const results = await db.executeQueryWithParams(sql, params);
    return results.length ? _.first(results).id : null;

  } catch (error) {
    log.error('getCityByGooglePlaceId', 'error getting city by google place ID from db', { error, googlePlaceId });
    throw error;
  }
}

async function upsertCity(cityName, countyId, city, googlePlaceId) {
  const sql = `INSERT INTO cities (name, countyId, cityData, googlePlaceId)
               VALUES (?, ?, ?, ?) 
               ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`;
  const params = [cityName, countyId, city, googlePlaceId];

  try {
    const results = await db.executeQueryWithParams(sql, params);
    return results.insertId;

  } catch (error) {
    log.error('upsertCity', 'error upserting city into db', { error, cityName, countyId, city, googlePlaceId });
    throw error;
  }
}

export default {
  getCityByGooglePlaceId,
  upsertCity,
};
