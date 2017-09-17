import async from 'async';

import models from 'models';
import Logger from 'util/Logger';

const log = new Logger('controllers/list');

export default {
  getLists,
};

function getLists({ userId }, mainCallback) {
  let userLists;
  let recommendedLists;

  async.parallel([
    function getUserLists(callback) {
      models.list.getLists({ userId }, (error, lists) => {
        if (error) { return callback(error); }

        userLists = lists;

        return callback();
      });
    },

    function getRecommendedLists(callback) {
      models.recommendedList.getLists({ userId }, (error, lists) => {
        if (error) { return callback(error); }

        recommendedLists = lists;

        return callback();
      });
    },
  ], (error) => {
    if (error) {
      log.error('getLists', 'error getting all lists', { error, userId });
      return mainCallback(error);
    }

    return mainCallback(null, { userLists, recommendedLists });
  });
}
