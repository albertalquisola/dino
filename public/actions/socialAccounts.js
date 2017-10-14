import fetcher from 'util/fetcher';

const SOCIAL_ACTIONS = {
  fetchingSocialAccounts: () => {
    return {
      type: 'FETCHING_SOCIAL_ACCOUNTS',
    };
  },

  fetchedSocialAccounts: (socialAccounts) => {
    return {
      type: 'FETCHED_SOCIAL_ACCOUNTS',
      payload: socialAccounts,
    };
  },

  socialAccountsError: (error) => {
    return {
      type: 'SOCIAL_ACCOUNTS_ERROR',
      error,
    };
  },
};

exports.fetchSocialAccounts = (options) => {
  return (dispatch) => {
    dispatch(SOCIAL_ACTIONS.fetchingSocialAccounts());

    fetcher.get(`/api/v1/companies/${options.companyId}/social-accounts`, (socialAccounts) => {
      if (socialAccounts.error)
        return dispatch(SOCIAL_ACTIONS.socialAccountsError(socialAccounts.error));

      return dispatch(SOCIAL_ACTIONS.fetchedSocialAccounts(socialAccounts));
    });
  };
};