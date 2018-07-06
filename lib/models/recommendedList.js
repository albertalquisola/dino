import db from 'models/db';
import Logger from 'util/Logger';

const log = new Logger('models/recommendedList');

export default {
  createList,
  getLists,
};

function createList(userId, recommendedUserId, data, callback) {
  const sql = 'INSERT INTO recommended_lists (id, userId, list)  VALUES (?, ?, ?)';
  const params = [userId, recommendedUserId, data];

  db.executeQueryWithParams(sql, params, (error, listId) => {
    if (error) {
      log.error('createList', 'error creating list when writing to db', { error });
      return callback(error);
    }

    return callback(null, listId);
  });
}

function getLists(userId, callback) {
  const sql = 'SELECT * FROM recommended_lists WHERE id = ?';
  const params = [userId];

  db.executeQueryWithParams(sql, params, (errors, lists) => {
    if (error) {
      log.error('getLists', 'error getting recommended lists from db', { error });
      return callback(error);
    }

    return callback(null, lists);
  });
}
