import db from 'models/db';
import Logger from 'util/Logger';

const log = new Logger('models/place');

async function addPlace(placeName, cityId, place, googlePlaceId, yelpData) {
  const sql = `INSERT INTO places (name, cityId, googlePlaceId, googlePlaceData, yelpPlaceData) 
               VALUES (?, ?, ?, ?, ?)
               ON DUPLICATE KEY UPDATE 
                 id = LAST_INSERT_ID(id),
                 name = VALUES(name),
                 cityId = VALUES(cityId),
                 googlePlaceData = VALUES(googlePlaceData),
                 yelpPlaceData = VALUES(yelpPlaceData)`;
  const params = [placeName, cityId, googlePlaceId, place, yelpData];

  try {
    const results = await db.executeQueryWithParams(sql, params);
    return results.insertId;

  } catch (error) {
    log.error('addPlace', 'error adding new place to db', { error, place, googlePlaceId });
    throw error;
  }
}

export default {
  addPlace,
};
