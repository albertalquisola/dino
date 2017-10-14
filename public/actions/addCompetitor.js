import async from 'async';
import _ from 'lodash';

import companyActions from 'actions/company';
import fetcher from 'util/fetcher';

const ADD_COMPETITOR_ACTIONS = {
  resetCompetitor: () => {
    return {
      type: 'RESET_COMPETITOR',
    };
  },

  fetchingCompetitor: () => {
    return {
      type: 'FETCHING_COMPETITOR',
    };
  },

  fetchedCompetitor: (competitor) => {
    return {
      type: 'FETCHED_COMPETITOR',
      payload: competitor,
    };
  },

  addingCompetitor: () => {
    return {
      type: 'ADDING_COMPETITOR',
    };
  },

  addedCompetitor: () => {
    return {
      type: 'ADDED_COMPETITOR',
    };
  },

  showCompetitorModal: () => {
    return {
      type: 'SHOW_COMPETITOR_MODAL',
    };
  },

  hideCompetitorModal: () => {
    return {
      type: 'HIDE_COMPETITOR_MODAL',
    };
  },

  errorFetchingCompetitor: (error) => {
    return {
      type: 'FETCH_COMPETITOR_ERROR',
      error,
    };
  },

  competitorError: () => {
    return {
      type: 'ADD_COMPETITOR_ERROR',
    };
  },
};

/*
 * addCompetitorStats
 *
 * when a user enters a competitor url
 * we need to fetch competitor stats
 * for our own benefit, we also register this company in the database as well
 * so we can aggregate data for this competitor over time
 *
 */
exports.addCompetitorStats = (options) => {
  return (dispatch) => {
    dispatch(ADD_COMPETITOR_ACTIONS.fetchingCompetitor());

    async.waterfall([
      function fetchLatestScorecard(callback) {
        // TODO: [Albert]
        // before posting a scorecard, try fetching their latest one
        // if they do not have one, then post a scorecard
        return callback();
      },

      function postClientRequest(callback) {
        fetcher.post('/api/v1/client-requests', { url: options.url }, (clientRequestJson) => {
          if (clientRequestJson.error)
            return callback(clientRequestJson.error);

          return callback(null, clientRequestJson);
        });
      },

      function postScorecard(clientRequestJson, callback) {
        const scOpts = _.extend({}, options, clientRequestJson);

        fetcher.post('/api/v1/scorecards', scOpts, (scorecardJson) => {
          if (scorecardJson.error)
            return callback(scorecardJson.error);

          return callback(null, scorecardJson);
        });
      },
    ],
    (error, competitor) => {
      if (error)
        return dispatch(ADD_COMPETITOR_ACTIONS.errorFetchingCompetitor(error));

      return dispatch(ADD_COMPETITOR_ACTIONS.fetchedCompetitor(competitor));
    });
  };
};

exports.addCompetitor = (options) => {
  return (dispatch) => {
    dispatch(ADD_COMPETITOR_ACTIONS.addingCompetitor());

    fetcher.post('/api/v1/competitors', options, (competitor) => {
      if (competitor.error)
        return dispatch(ADD_COMPETITOR_ACTIONS.competitorError());

      // fetch company to get updated list of company competitors
      dispatch(companyActions.getCompany(options.companyId));
      return dispatch(ADD_COMPETITOR_ACTIONS.addedCompetitor(competitor));
    });
  };
};

exports.resetCompetitor = () => {
  return (dispatch) => {
    return dispatch(ADD_COMPETITOR_ACTIONS.resetCompetitor());
  };
};

exports.showCompetitorModal = () => {
  return (dispatch) => {
    dispatch(ADD_COMPETITOR_ACTIONS.showCompetitorModal());
  };
};

exports.hideCompetitorModal = () => {
  return (dispatch) => {
    dispatch(ADD_COMPETITOR_ACTIONS.hideCompetitorModal());
  };
};