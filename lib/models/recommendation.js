import db from 'models/db';
import Logger from 'util/Logger';

const log = new Logger('models/recommendation');

async function createRec(placeId, userId) {
  const sql = `INSERT INTO recommendations (place_id, user_id) 
               VALUES (?, ?)
               ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`;
  const params = [placeId, userId];

  try {
    const results = await db.executeQueryWithParams(sql, params);
    return results.insertId;

  } catch (error) {
    log.error('createRec', 'error creating recommendation', { error, placeId, userId });
    throw error;
  }
}

export default {
  createRec,
};
