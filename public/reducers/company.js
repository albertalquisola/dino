const companyReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCHING_COMPANY':
      return {
        ...state,
        fetchingCompany: true,
        fetchedCompany: false
      };

    case 'FETCHED_COMPANY':
      return {
        ...state,
        ...action.payload,
        fetchingCompany: false,
        fetchedCompany: true
      };

    case 'ERROR_FETCHING_COMPANY':
      return {
        ...state,
        fetchingCompany: false,
        fetchedCompany: false,
        error: action.error
      };

    case 'POSTING_COMPANY':
      return {
        ...state,
        postingCompany: true,
        postedCompany: false
      };

    case 'POSTED_COMPANY':
      return {
        ...state,
        postingCompany: false,
        postedCompany: true
      };

    case 'ERROR_POSTING_COMPANY':
      return {
        ...state,
        postingCompany: false,
        postedCompany: false,
        error: action.error
      };

    default:
      return state;
  }
};

module.exports = companyReducer;