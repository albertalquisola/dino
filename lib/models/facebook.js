import db from 'models/db';
import Logger from 'util/Logger';

const log = new Logger('models/facebook');

async function saveFacebookData({ accessToken, facebookId, expiresIn }) {
  const sql = `INSERT INTO facebook_user_auth (access_token, facebook_id, expires_in)
               VALUES (?, ?, ?)
               ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`;
  const params = [accessToken, facebookId, expiresIn];
  let results, error;

  try {
    results = await db.executeQueryWithParams(sql, params);
  } catch (err) {
    log.error('insertFacebookUser', 'error inserting facebook user into db', { err, facebookId });
    error = err;
  }

  return { error, results };
}

export default {
  saveFacebookData,
};
