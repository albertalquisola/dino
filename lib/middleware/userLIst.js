import controllers from 'controllers';
import Logger from 'util/Logger';

const log = new Logger('mw/userList');

export default {
  createList,
  getList,
  getLists,
};

function getLists(req, res, next) {
  const userId = req.user.id;

  if (!userId) {
    log.error('getLists\', \'user ID not found when fetching a user\'s lists', { user: req.user });
    return next(new Error('user ID not found'));
  }

  controllers.userList.getLists({ userId }, (error, lists) => {
    if (error) { return next(error); }

    return res.json(lists);
  });
}

function getList(req, res, next) {
  const options = {
    userId: req.user && req.user.id,
    listId: req.params.id,
  };

  if (!userId) {
    log.error('getList\', \'no user ID when fetching list', { listId, user: req.user });
    return next(new Error('user ID not found'));
  }

  if (!listId) {
    log.error('getList', 'no list ID when fetching list', { listId, user: req.user });
  }

  controllers.userList.getList(options, (error, list) => {
    if (error) { return next(error); }

    return res.json(list);
  });
}

function createList(req, res, next) {
  const options = {
    userId: req.user.id,
    name: req.body.name,
    type: req.body.type,
    data: req.body.data || {},
  };

  if (!options.userId) {
    log.error('createUserList', 'no user ID when creating list', { user: req.user });
    return next(new Error('user ID not found'));
  }

  if (!options.name) {
    log.error('createUserList', 'trying to create list with no list name');
    return next(new Error('no list name provided'));
  }

  if (!options.type) {
    log.error('createUserList', 'trying to create a list with no list type');
    return next(new Error('no list type provided'));
  }

  controllers.userList.createUserList(options, (error, listId) => {
    if (error) { return next(error); }

    return res.json(listId);
  });
}
