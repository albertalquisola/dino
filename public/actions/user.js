import fetcher from 'util/fetcher';

const USER_ACTIONS = {
  errorFetchingUser: (error) => {
    return {
      type: 'ERROR_FETCHING_USER',
      payload: { error }
    };
  },

  errorMarkingAsReturningUser: (error) => {
    return {
      type: 'ERROR_MARKING_AS_RETURNING_USER',
      payload: { error }
    };
  },

  fetchedUser: (user) => {
    if (!user)
      user = {};

    return {
      type: 'FETCHED_USER',
      payload: { user }
    };
  },

  fetchingUser: () => {
    return {
      type: 'FETCHING_USER'
    };
  },

  markingAsReturningUser: () => {
    return {
      type: 'MARKING_AS_RETURNING_USER'
    };
  },

  markedAsReturningUser: () => {
    return {
      type: 'MARKED_AS_RETURNING_USER'
    };
  }
};

exports.fetchUser = () => {
  return (dispatch) => {
    dispatch(USER_ACTIONS.fetchingUser());

    return fetcher.get('/user', (json) => {
      if (json.error)
        return dispatch(USER_ACTIONS.errorFetchingUser(json.error));

      if (json.user) { window.user = json.user; }


      return dispatch(USER_ACTIONS.fetchedUser(json.user));
    });
  };
};

exports.markAsReturningUser = (userId) => {
  return (dispatch) => {
    dispatch(USER_ACTIONS.markingAsReturningUser());

    fetcher.patch(`/api/v1/users/${userId}/new-user`, (json) => {
      if (json.error)
        return dispatch(USER_ACTIONS.errorMarkingAsReturningUser(json.error));

      return dispatch(USER_ACTIONS.markedAsReturningUser());
    });
  };
};