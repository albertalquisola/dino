import _ from 'lodash';

import models from 'models';
import Logger from 'util/Logger';

const log = new Logger('services/friend');

export async function saveFriends(userId, userFriends) {
  if (!userFriends.length)
    return;

  const friendsData = formatFriends(userId, userFriends);
  try {
    return await models.friend.saveFriends(friendsData);

  } catch (error) {
    log.error('saveFriends', 'error saving friends', { error });
    throw error;
  }
}

function formatFriends(userId, userFriends) {
  const friendsList = [];

  _.each(userFriends, (friend) => {
    friendsList.push([userId, friend.id]);
    friendsList.push([friend.id, userId]);
  });

  return friendsList;
}

export default {
  saveFriends,
};
