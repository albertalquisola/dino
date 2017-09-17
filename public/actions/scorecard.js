import async from 'async';
import _ from 'lodash';

import fetcher from 'util/fetcher';

const SC_ACTIONS = {
  calculatingScorecard: () => {
    return {
      type: 'CALCULATING_SCORECARD'
    };
  },

  calculatedScorecard: (scorecard) => {
    return {
      type: 'CALCULATED_SCORECARD',
      payload: { scorecard }
    };
  },

  fetchingScorecard: () => {
    return {
      type: 'FETCHING_SCORECARD'
    };
  },

  fetchedScorecard: (scorecard) => {
    return {
      type: 'FETCHED_SCORECARD',
      payload: { scorecard }
    };
  },

  showSocialModal: () => {
    return {
      type: 'SHOW_SOCIAL_MODAL'
    };
  },

  hideSocialModal: () => {
    return {
      type: 'HIDE_SOCIAL_MODAL'
    };
  },

  errorFetching: (error) => {
    return {
      type: 'ERROR_FETCHING_SCORECARD',
      payload: error
    };
  },

  errorCalculating: (error) => {
    return {
      type: 'ERROR_CALCULATING_SCORECARD',
      payload: error
    };
  },

  resetAnalyzer: () => {
    return {
      type: 'RESET_ANALYZER'
    };
  }
};

exports.calculateScorecard = (options) => {
  return (dispatch) => {
    dispatch(SC_ACTIONS.calculatingScorecard());

    // temporary setTimeout to show loading state
    setTimeout(() => {

      async.waterfall([
        function postClientRequest(callback) {
          fetcher.post('/api/v1/client-requests', { url: options.url }, (clientRequestJson) => {
            if (clientRequestJson.error)
              return callback(clientRequestJson.error);

            return callback(null, clientRequestJson);
          });
        },

        function postScorecard(clientRequestJson, callback) {
          const scOpts = _.extend({}, options, clientRequestJson);
          dispatch(SC_ACTIONS.calculatingScorecard());

          fetcher.post('/api/v1/scorecards', scOpts, (scorecardJson) => {
            if (scorecardJson.error)
              return callback(scorecardJson.error);

            return callback(null, scorecardJson);
          });
        }
      ],
      (error, results) => {
        if (error)
          return dispatch(SC_ACTIONS.errorCalculating(error));

        return dispatch(SC_ACTIONS.calculatedScorecard(results));
      });

    }, 10000);
  };
};

exports.fetchScorecard = (options) => {
  return (dispatch) => {
    dispatch(SC_ACTIONS.fetchingScorecard());

    fetcher.get(`/api/v1/scorecards/${options.requestId}`, (json) => {
      if (json.error)
        return dispatch(SC_ACTIONS.errorFetching(json));

      return dispatch(SC_ACTIONS.fetchedScorecard(json));
    });
  };
};

exports.showSocialModal = () => {
  return (dispatch) => {
    dispatch(SC_ACTIONS.showSocialModal());
  };
};

exports.hideSocialModal = () => {
  return (dispatch) => {
    dispatch(SC_ACTIONS.hideSocialModal());
  };
};

exports.resetAnalyzer = () => {
  return (dispatch) => {
    dispatch(SC_ACTIONS.resetAnalyzer());
  };
};