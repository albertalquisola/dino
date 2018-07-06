const userRecommendationsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCHING_USER_RECS':
      return {
        ...state,
        isPending: true,
      };

    case 'FETCHING_USER_RECS_SUCCESS':
      return {
        ...state,
        isPending: false,
        data: action.payload.userRecs,
      };

    case 'FETCHING_USER_RECS_ERROR':
      return {
        ...state,
        isPending: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default userRecommendationsReducer;
