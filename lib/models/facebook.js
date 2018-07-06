import db from 'models/db';
import Logger from 'util/Logger';

const log = new Logger('models/facebook');

async function saveFacebookData({ accessToken, facebookId, expiresIn }) {
  const sql = `INSERT INTO facebookUserAuth (accessToken, facebookId, expiresIn)
               VALUES (?, ?, ?)
               ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`;
  const params = [accessToken, facebookId, expiresIn];

  try {
    return await db.executeQueryWithParams(sql, params);

  } catch (error) {
    log.error('insertFacebookUser', 'error inserting facebook user into db', { error, facebookId });
    throw error;
  }
}

export default {
  saveFacebookData,
};
