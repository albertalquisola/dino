import fetcher from 'util/fetcher';

const COMPETITOR_ACTIONS = {
  resetCompetitorReport: () => {
    return {
      type: 'RESET_COMPETITOR_REPORT'
    };
  },

  postingCompetitorReport: () => {
    return {
      type: 'POSTING_COMPETITOR_REPORT'
    };
  },

  postedCompetitorReport: (reportId) => {
    return {
      type: 'POSTED_COMPETITOR_REPORT',
      payload: reportId
    };
  },

  noCompetitorsSelected: () => {
    return {
      type: 'NO_COMPETITORS_SELECTED'
    };
  },

  competitorReportError: (error) => {
    return {
      type: 'COMPETITOR_REPORT_ERROR',
      error
    };
  },

  competitorError: (error) => {
    return {
      type: 'COMPETITOR_ERROR',
      error
    };
  }
};

exports.resetCompetitorReport = () => {
  return (dispatch) => {
    dispatch(COMPETITOR_ACTIONS.resetCompetitorReport());
  };
};

exports.postCompetitorReport = (options) => {
  return (dispatch) => {
    dispatch(COMPETITOR_ACTIONS.postingCompetitorReport());

    fetcher.post(`/api/v1/competitor-reports`, options, (results) => {
      if (results.error)
        return dispatch(COMPETITOR_ACTIONS.competitorReportError(results.error));

      return dispatch(COMPETITOR_ACTIONS.postedCompetitorReport(results.reportId));
    });
  };
};

exports.noCompetitorsSelected = () => {
  return (dispatch) => {
    dispatch(COMPETITOR_ACTIONS.noCompetitorsSelected());
  };
};