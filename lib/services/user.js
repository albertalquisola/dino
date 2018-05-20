import _ from 'lodash';

import models from 'models';
import Logger from 'util/Logger';

const log = new Logger('services/user');

export async function upsertUser({ firstName, lastName, email, password, facebookAuthId, profilePic }) {
  try {
    return await models.user.upsertUser({ firstName, lastName, email, password, facebookAuthId, profilePic });

  } catch (error) {
    log.error('upsertUser', 'error creating user', { error, email });
    throw error;
  }
}

export async function getUserById(id) {
  try {
    return await models.user.getUserById(id);

  } catch (error) {
    log.error('getUserById', 'error getting user by ID', { error, id });
    throw error;
  }
}

export async function getUsersByFacebookId(fbFriends) {
  if (!fbFriends.length)
    return null;

  const fbFriendIds = _.map(fbFriends, (friend) => friend.id);

  try {
    return await models.user.getUsersByFacebookId(fbFriendIds);

  } catch (error) {
    log.error('getUsersByFacebookId', 'error getting list of users by their facebook IDs', { error });
    throw error;
  }
}

export default {
  upsertUser,
};
