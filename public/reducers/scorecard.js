const scorecardReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CALCULATING_SCORECARD':
      return {
        ...state,
        calculatingScorecard: true,
        error: null
      };

    case 'CALCULATED_SCORECARD':
      return {
        ...state,
        ...action.payload.scorecard,
        calculatingScorecard: false,
        calculatedScorecard: true
      };

    case 'FETCHED_SCORECARD':
      return {
        ...state,
        ...action.payload.scorecard,
        fetchingScorecard: false,
        fetchedScorecard: true
      };

    case 'ERROR_CALCULATING_SCORECARD':
      return {
        ...state,
        calculatingScorecard: false,
        calculatedScorecard: false,
        error: action.payload
      };

    case 'RESET_ANALYZER':
      return {};

    default:
      return state;
  }
};

module.exports = scorecardReducer;