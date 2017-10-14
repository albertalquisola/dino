const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return { ...state };

    case 'FETCHING_USER':
      return {
        ...state,
        isFetching: true,
      };

    case 'FETCHED_USER':
      return {
        ...state,
        ...action.payload.user,
        isFetching: false,
      };

    case 'POSTED_COMPANY':
      return {
        ...state,
        currentAgency: action.payload.company,
        hasBetaAccess: action.payload.company.hasBetaAccess,
        registrationComplete: true,
      };

    default:
      return state;
  }
};

module.exports = userReducer;