const addSocialAccountReducer = (state = {}, action) => {
  switch (action.type) {

    case 'ADD_ANOTHER_ACCOUNT':
      return {
        ...state,
        updatedAccount: false,
      };

    case 'BACK_TO_NO_ACCOUNT':
      return {
        ...state,
        hasAccount: false,
        fetchedAccountDetails: false,
        noAccountFound: false,
        invalidAccountId: false,
      };

    case 'HAS_ACCOUNT':
      return {
        ...state,
        hasAccount: true,
        fetchedAccountDetails: false,
        noAccountFound: false,
        invalidAccountId: false,
        account: action.payload,
      };

    case 'FETCHED_ACCOUNT_DETAILS':
      return {
        ...state,
        hasAccount: true,
        fetchedAccountDetails: true,
        noAccountFound: false,
        invalidAccountId: false,
        accountDetails: action.payload,
      };

    case 'UPDATED_ACCOUNT':
      return {
        ...state,
        updatedAccount: true,
        hasAccount: false,
        fetchedAccountDetails: false,
        noAccountFound: false,
      };

    case 'SHOW_SOCIAL_MODAL':
      return {
        ...state,
        showSocialModal: true,
        accountToShow: action.payload,
      };

    case 'HIDE_SOCIAL_MODAL':
      return {
        showSocialModal: false,
      };

    case 'INVALID_ACCOUNT_ID':
      return {
        ...state,
        hasAccount: true,
        fetchedAccountDetails: false,
        noAccountFound: false,
        invalidAccountId: true,
      };

    case 'ERROR_FETCHING_ACCOUNT_DETAILS':
      return {
        ...state,
        hasAccount: true,
        fetchedAccountDetails: false,
        noAccountFound: true,
      };

    default:
      return state;
  }
};

module.exports = addSocialAccountReducer;