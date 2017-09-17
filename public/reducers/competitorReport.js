const competitorReportReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCHING_COMPETITOR_REPORT':
      return {
        ...state,
        fetchingCompetitorReport: true
      };

    case 'FETCHED_COMPETITOR_REPORT':
      return {
        ...state,
        fetchingCompetitorReport: false,
        ...action.payload
      };
    case 'REPORT_ERROR':
      return {
        ...state,
        ...action.error,
        fetchingCompetitorReport: false
      };

    default:
      return state;
  }
};

module.exports = competitorReportReducer;