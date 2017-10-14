const socialAccountsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCHING_SOCIAL_ACCOUNTS':
      return {
        ...state,
        fetchingAccounts: true,
      };

    case 'FETCHED_SOCIAL_ACCOUNTS':
      return {
        ...state,
        fetchingAccounts: false,
        fetchedAccounts: true,
        ...action.payload,
      };

    default:
      return state;
  }
};

module.exports = socialAccountsReducer;