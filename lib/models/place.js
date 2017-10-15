import db from 'models/db';
import Logger from 'util/Logger';

const log = new Logger('models/place');

async function addPlace(place, googlePlaceId) {
  const sql = `INSERT INTO places (place, google_place_id) 
               VALUES (?, ?)
               ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`;
  const params = [place, googlePlaceId];

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
