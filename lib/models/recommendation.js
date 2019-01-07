import db from 'models/db';
import Logger from 'util/Logger';

const log = new Logger('models/recommendation');

async function getFriendsRecommendationsForCity(userId, cityId) {
  const sql = `SELECT p.id, p.googlePlaceId, p.googlePlaceData, p.yelpPlaceData, u.firstName, u.lastName, u.profilePic
               FROM recommendations AS r
               LEFT JOIN places AS p ON p.id = r.placeId
               LEFT JOIN users AS u ON r.userId = u.id
               WHERE r.userId IN (SELECT friendId FROM friends WHERE userId = ?)
               AND p.cityId = ?`;
  const params = [userId, cityId];

  try {
    return await db.executeQueryWithParams(sql, params);

  } catch (error) {
    log.error('getFriendsRecommendationsForCity', 'error getting friends recomendations from db', { error, userId, cityId });
    throw error;
  }
}

async function getUserRecommendations(userId) {
  const sql = `SELECT r.id, r.placeId, googlePlaceId, googlePlaceData, yelpPlaceData
               FROM recommendations AS r
               LEFT JOIN places AS p
               ON r.placeId = p.id
               WHERE r.userId = ?`;
  const params = [userId];

  try {
    return await db.executeQueryWithParams(sql, params);

  } catch (error) {
    log.error('getUserRecommendations', 'error getting user recs from db', { error, userId });
    throw error;
  }
}

async function createRec(placeId, userId) {
  const sql = `INSERT INTO recommendations (placeId, userId) 
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

async function getFriendsWhoLikeSamePlace(placeId, userId) {
  const sql = `SELECT * 
               FROM users AS u 
               WHERE u.id IN (SELECT friendId 
               FROM friends AS f
               INNER JOIN recommendations AS r
               ON f.friendId = r.userId
               WHERE r.placeId = ?
               AND f.userId = ?)`;
  const params = [placeId, userId];

  try {
    return await db.executeQueryWithParams(sql, params);
  } catch (error) {
    log.error('getFriendsWhoLikeSamePlace', 'error getting friends who like same place', { placeId, userId });
    throw error;
  }
}

export default {
  getFriendsRecommendationsForCity,
  getFriendsWhoLikeSamePlace,
  getUserRecommendations,
  createRec,
};
