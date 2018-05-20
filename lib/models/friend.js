import db from 'models/db';
import Logger from 'util/Logger';

const log = new Logger('models/friends');

export async function saveFriends(friendData) {
  const sql = `INSERT INTO friends (userId, friendId) VALUES ?
               ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`;
  const params = [friendData];

  try {
    await db.executeQueryWithParams(sql, params);

  } catch (error) {
    log.error('saveFriends', 'error saving friends to db', { error });
    throw error;
  }
}

export default {
  saveFriends,
};
