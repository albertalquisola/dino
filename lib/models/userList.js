import _ from 'lodash';

import db from 'models/db';
import Logger from 'util/Logger';

const log = new Logger('models/userList');

export default {
  createList,
  getList,
  getLists,
};

function getList({ userId, listId }, callback) {
  const sql = 'SELECT * FROM user_lists WHERE user_id = ? AND list_id = ?';
  const params = [userId, listId];

  db.executeQueryWithParams(sql, params, (error, list) => {
    if (error) {
      log.error('getList', 'error getting list from db', { error, listId, userId });
      return callback(error);
    }

    return callback(null, _.first(list));
  });
}

function getLists({ userId }, callback) {
  const sql = 'SELECT * FROM user_lists WHERE user_id = ?';
  const params = [userId];

  db.executeQueryWithParams(sql, params, (error, list) => {
    if (error) {
      log.error('getLists', 'error getting list from db', { error, listId, userId });
      return callback(error);
    }

    return callback(null, _.first(list));
  });
}

function createList({ userId, name, type, data }, callback) {
  const sql = `INSERT INTO user_lists (user_id, name, type, data) 
               VALUES (?, ?, ?, ?)`;
  const params = [userId, name, type, data];

  db.executeQueryWithParams(sql, params, (error, results) => {
    if (error) {
      log.error('createUserList', 'error creating user list', { error, userId, name, type });
      return callback(error);
    }

    return callback(null, results.insertId);
  });
}
