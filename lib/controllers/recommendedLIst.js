import models from 'models';
import Logger from 'util/Logger';

const log = new Logger('controllers/recommendedList');

export default {
  getLists,
};

function getLists({ userId }, callback) {
  models.recommendedList.getLists(userId, (error, lists) => {
    if (error) {
      log.error('getLists', 'error getting recommended lists', { error });
      return callback(error);
    }

    return callback(null, lists);
  });
}
