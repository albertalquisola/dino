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

async function upsertUser({ email, firstName, lastName, password, facebookAuthId, profilePic }) {
  const sql = `INSERT INTO users (email, firstName, lastName, password, facebookAuthId, profilePic)
               VALUES (?, ?, ?, ?, ?, ?)
               ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`;
  const params = [email, firstName, lastName, password, facebookAuthId, profilePic];

  try {
    return await db.executeQueryWithParams(sql, params);
  } catch (error) {
    log.error('insertUser', 'error adding new user', { error, email });
    throw error;
  }
}

async function getUserById(id) {
  const sql = 'SELECT id, firstName, lastName, email, facebookAuthId FROM users WHERE id = ?';
  const params = [id];

  try {
    const results = await db.executeQueryWithParams(sql, params);
    return _.first(results);

  } catch (error) {
    log.error('getUserById', 'error getting user by ID', { error, id });
    throw error;
  }
}

export async function getUsersByFacebookId(fbIds) {
  const sql = `SELECT u.id, firstName, lastName, facebookId 
               FROM users AS u
               LEFT JOIN facebookUserAuth AS fbua
               ON u.facebookAuthId = fbua.id
               WHERE facebookId IN (?)`;

  const params = [fbIds];

  try {
    return await db.executeQueryWithParams(sql, params);

  } catch (error) {
    log.error('getUsersByFacebookId', 'error getting users by facebook ID', { fbIds, error });
    throw error;
  }
}

export default {
  getUserByEmail,
  getUsersByFacebookId,
  getUserById,
  upsertUser,
};
