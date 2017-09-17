const addCompetitorReducer = (state = {}, action) => {
  switch (action.type) {
    case 'HIDE_COMPETITOR_MODAL':
      return {
        ...state,
        showCompetitorModal: false,
      };

    case 'RESET_COMPETITOR_REPORT':
      return {
        ...state,
        postedCompetitorReport: false
      };

    case 'POSTING_COMPETITOR_REPORT':
      return {
        ...state,
        postingCompetitorReport: true
      };

    case 'POSTED_COMPETITOR_REPORT':
      return {
        ...state,
        postingCompetitorReport: false,
        postedCompetitorReport: true,
        reportId: action.payload
      };

    case 'NO_COMPETITORS_SELECTED':
      return {
        ...state,
        noCompetitorsSelected: true
      };

    case 'COMPETITOR_REPORT_ERROR':
      return {
        ...state,
        postingCompetitorReport: false,
        error: action.payload
      };

    case 'COMPETITOR_ERROR':
      return {
        ...state,
        fetchingCompetitors: false,
        error: action.payload
      };

    default:
      return state;
  }
};

module.exports = addCompetitorReducer;