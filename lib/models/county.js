import db from 'models/db';
import Logger from 'util/Logger';

const log = new Logger('models/county');

async function upsertCounty(countyName) {
  const sql = `INSERT INTO counties (name)
               VALUES (?) 
               ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`;
  const params = [countyName];

  try {
    const results = await db.executeQueryWithParams(sql, params);
    return results.insertId;

  } catch (error) {
    log.error('upsertCounty', 'error upserting county into db', { error, countyName });
    throw error;
  }
}

export default {
  upsertCounty,
};
