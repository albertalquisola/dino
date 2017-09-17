import _ from 'lodash';
import async from 'async';

import models from 'models';
import Logger from 'util/Logger';

const log = new Logger('controllers/userList');

export default {
  createList,
  getList,
  getLists,
};

function getLists({ userId }, callback) {
  models.userList.getLists(userId, (error, lists) => {
    if (error) {
      log.error('getLists', 'error retrieving lists', { error, userId });
      return callback(error);
    }

    return callback(null, lists);
  });
}

function getList({ userId, listId }, callback) {
  models.userList.getList({ userId, listId }, (error, list) => {
    if (error) {
      log.error('getList', 'error getting list', { listId, userId });
      return callback(error);
    }
    if (!list) {
      log.error('error getting list', { userId, listId });
      return callback(new Error('error getting list'));
    }

    return callback(null, list);
  });
}

function createList({ userId, name, type, list }, callback) {
  const listJson = JSON.stringify(list);

  if (listJson.invalidJSON) {
    log.error('createUserList', 'list is invalid json');
    return callback(new Error('invalid list format'));
  }

  models.userList.createList({ userId, name, type }, (error, listId) => {
    if (error) {
      log.error('createUserList', 'error creating user list', { userId, name, type });
      return callback(error);
    }

    return callback(null, listId);
  });
}
