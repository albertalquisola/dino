const addCompetitorsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCHING_COMPETITOR':
      return {
        ...state,
        fetchingCompetitor: true,
        errorFetchingCompetitor: false
      };

    case 'FETCHED_COMPETITOR':
      return {
        ...state,
        fetchingCompetitor: false,
        fetchedCompetitor: true,
        ...action.payload
      };

    case 'SHOW_COMPETITOR_MODAL':
      return {
        ...state,
        showCompetitorModal: true
      };

    case 'HIDE_COMPETITOR_MODAL':
      return {
        showCompetitorModal: false
      };

    case 'ADDING_COMPETITOR':
      return {
        ...state,
        addingCompetitor: true
      };

    case 'ADDED_COMPETITOR':
      return {
        showCompetitorModal: false
      };

    case 'RESET_COMPETITOR':
      return {
        showCompetitorModal: true
      };

    case 'FETCH_COMPETITOR_ERROR':
      return {
        ...state,
        fetchingCompetitor: false,
        fetchedCompetitor: false,
        errorFetchingCompetitor: true
      };

    case 'ADD_COMPETITOR_ERROR':
      return {
        ...state,
        error: true
      };

    default:
      return state;
  }
};

module.exports = addCompetitorsReducer;