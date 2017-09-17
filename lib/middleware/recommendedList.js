import controllers from 'controllers';
import Logger from 'util/Logger';

const log = new Logger('mw/recommendedList');

export default {
  createList,
  getLists,
};

function getLists(req, res, next) {
  const userId = req.user.id;

  if (!userId) {
    log.error('getLists\', \'user ID not found when fetching a user\'s lists', { user: req.user });
    return next(new Error('user ID not found'));
  }

  controllers.recommendedList.getLists({ userId }, (error, lists) => {
    if (error) { return next(error); }

    return res.json(lists);
  });
}

function createList(req, res, next) {
  const userId = req.user.id;
  const recommendedUserId = req.body.userId;
  const data = req.body.data;

  if (!userId) {
    log.error('createList', 'user ID not fuond when creating a recommended list', { user: req.user });
    return next(new Error('user ID not found'));
  }

  if (!recommendedUserId) {
    log.error('createList', 'trying to create a list but no recommended ID specified', { recommendedUserId });
    return next(new Error('recommendedUserId not found'));
  }

  controllers.recommendedList.createList({ userId, recommendedUserId }, (error, listId) => {
    if (error) { return next(error); }

    return res.json({ listId });
  });
}
