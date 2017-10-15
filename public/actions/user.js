import fetcher from 'util/fetcher';

const USER_ACTIONS = {
  fetchingUser: () => {
    return { type: 'FETCHING_USER' };
  },

  fetchUserSuccess: (user) => {
    return { type: 'FETCHING_USER_SUCCESS', payload: { user } };
  },

  fetchUserError: (error) => {
    return { type: 'FETCHING_USER_ERROR', payload: { error } };
  },
};

function fetchUser() {
  return async (dispatch) => {
    dispatch(USER_ACTIONS.fetchingUser());
    let response;

    try {
      response = await fetcher.get('/user');
      if (response.user) { window.user = response.user; }

      dispatch(USER_ACTIONS.fetchUserSuccess(response.user));
    } catch (error) {
      dispatch(USER_ACTIONS.fetchUserError(error));
    }

    return response;
  };
}

export default {
  fetchUser,
};
