import _ from 'lodash';

import db from 'models/db';
import Logger from 'util/Logger';

const log = new Logger('models/user');

async function getUserByEmail(email) {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const params = [email];
  let results, error;

  try {
    [results] = await db.executeQueryWithParams(sql, params);
  } catch (err) {
    log.error('getUserByEmail', 'error getting user by email', { error, email });
    error = err;
  }

  return { error, results };
}

async function insertUser({ email, firstName, lastName, password, facebookAuthId }) {
  const sql = `INSERT INTO users (email, first_name, last_name, password, facebook_auth_id)
               VALUES (?, ?, ?, ?, ?)
               ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`;
  const params = [email, firstName, lastName, password, facebookAuthId];
  let results, error;

  try {
    results = await db.executeQueryWithParams(sql, params);
  } catch (err) {
    log.error('insertUser', 'error adding new user', { err, email });
    error = err;
  }

  return { error, results };
}

async function getUserById(id) {
  const sql = 'SELECT id, first_name, last_name, email, facebook_auth_id FROM users WHERE id = ?';
  const params = [id];

  try {
    const results = await db.executeQueryWithParams(sql, params);
    return _.first(results);

  } catch (error) {
    log.error('getUserById', 'error getting user by ID', { error, id });
    throw error;
  }
}

export default {
  getUserByEmail,
  getUserById,
  insertUser,
};
