import fetcher from 'util/fetcher';
import socialAccountActions from 'actions/socialAccounts';
import scorecardActions from 'actions/scorecard';

const ADD_SOCIAL_ACTIONS = {
  addAnotherAccount: () => {
    return {
      type: 'ADD_ANOTHER_ACCOUNT'
    };
  },

  backToNoAccount: () => {
    return {
      type: 'BACK_TO_NO_ACCOUNT'
    };
  },

  hasAccount: (account) => {
    return {
      type: 'HAS_ACCOUNT',
      payload: account
    };
  },

  fetchedAccountDetails: (accountDetails) => {
    return {
      type: 'FETCHED_ACCOUNT_DETAILS',
      payload: accountDetails
    };
  },

  updatedAccount: () => {
    return {
      type: 'UPDATED_ACCOUNT'
    };
  },

  showSocialModal: (account) => {
    return {
      type: 'SHOW_SOCIAL_MODAL',
      payload: account
    };
  },

  hideSocialModal: () => {
    return {
      type: 'HIDE_SOCIAL_MODAL'
    };
  },

  invalidId: () => {
    return {
      type: 'INVALID_ACCOUNT_ID'
    };
  },

  errorFetchingAccountDetails: (error) => {
    return {
      type: 'ERROR_FETCHING_ACCOUNT_DETAILS',
      error
    };
  },

  errorUpdatingAccount: (error) => {
    return {
      type: 'ERROR_UPDATING_ACCOUNT'
    };
  }
};

exports.addAnotherAccount = () => {
  return (dispatch) => {
    return dispatch(ADD_SOCIAL_ACTIONS.addAnotherAccount());
  };
};

exports.backToNoAccount = () => {
  return (dispatch) => {
    return dispatch(ADD_SOCIAL_ACTIONS.backToNoAccount());
  };
};

exports.hasAccount = (options) => {
  return (dispatch) => {
    return dispatch(ADD_SOCIAL_ACTIONS.hasAccount(options.account));
  };
};

exports.fetchAccountDetails = (options) => {
  return (dispatch) => {
    if (!options.accountId)
      return dispatch(ADD_SOCIAL_ACTIONS.invalidId());

    fetcher.get(`/api/v1/social-accounts/${options.accountName}/${options.accountId}`, (json) => {
      if (json.error)
        return dispatch(ADD_SOCIAL_ACTIONS.errorFetchingAccountDetails(json.error));

      return dispatch(ADD_SOCIAL_ACTIONS.fetchedAccountDetails(json));
    });
  };
};

exports.updateAccount = (options) => {
  const companyId = options.companyId;
  const accountId = options.accountId;
  const data = { companyId, accountId };

  return (dispatch) => {
    fetcher.patch(`/api/v1/social-accounts/${options.accountName}`, data, (json) => {
      if (json.error)
        return dispatch(ADD_SOCIAL_ACTIONS.errorUpdatingAccount(json));

      if (options.requestId)
        dispatch(scorecardActions.fetchScorecard(options));

      dispatch(socialAccountActions.fetchSocialAccounts(options));
      dispatch(ADD_SOCIAL_ACTIONS.updatedAccount());
    });
  };
};

exports.showSocialModal = (account) => {
  return (dispatch) => {
    dispatch(ADD_SOCIAL_ACTIONS.showSocialModal(account));
  };
};

exports.hideSocialModal = () => {
  return (dispatch) => {
    dispatch(ADD_SOCIAL_ACTIONS.hideSocialModal());
  };
};