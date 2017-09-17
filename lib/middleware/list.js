import controllers from 'controllers';
import Logger from 'util/Logger';

const log = new Logger('mw/list');

export default {
  getLists,
};

function getLists(req, res, next) {
  const userId = req.user.id;

  if (!userId) {
    log.error('getLists', 'no user ID when getting all lists', { user: req.user });
    return next(new Error('user ID not found'));
  }

  controllers.list.getLists({ userId }, (error, lists) => {
    if (error) {
      log.error('getLists', 'error getting all lists', { error });
      return next(error);
    }

    return res.json(lists);
  });
}
