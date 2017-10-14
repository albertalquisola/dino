import fetcher from 'util/fetcher';

const CONNECTED = 'connected';
const NOT_AUTHORIZED = 'not_authorized';

const USER_ACTIONS = {
  facebookLoggingIn: () => {
    return { type: 'LOGGING_IN_WITH_FACEBOOK' };
  },
  facebookLoggedIn: (response) => {
    return { type: 'LOGGED_IN_WITH_FACEBOOK_SUCCESS', payload: response };
  },

  facebookLoggedInError: (error) => {
    return { type: 'LOGGED_IN_WITH_FACEBOOK_ERROR', payload: { error } };
  },
};

export default USER_ACTIONS;

export function loginWithFacebook() {
  return (dispatch) => {
    dispatch(USER_ACTIONS.facebookLoggingIn());
    FB.Login(createFacebookHandler(dispatch), { scope: 'email, public_profile, user_friends' });
  };
}

function createFacebookHandler(dispatch) {
  return async (response) => {
    switch (response.status) {
      case CONNECTED:
        const user = await fetcher.post('api/v1/users/', response);
        dispatch(USER_ACTIONS.facebookLoggedIn(user));
        return;

      case NOT_AUTHORIZED:
        dispatch(USER_ACTIONS.facebookLoggedInError(response));
        return;

      default:
        console.warn('saw an unknown response from facebook when attempting to login');
    }
  };
}

// exports.fetchUser = () => {
//   return (dispatch) => {
//     dispatch(USER_ACTIONS.fetchingUser());
//
//     return fetcher.get('/user', (json) => {
//       if (json.error)
//         return dispatch(USER_ACTIONS.errorFetchingUser(json.error));
//
//       if (json.user) { window.user = json.user; }
//
//
//       return dispatch(USER_ACTIONS.fetchedUser(json.user));
//     });
//   };
// };
//
// exports.markAsReturningUser = (userId) => {
//   return (dispatch) => {
//     dispatch(USER_ACTIONS.markingAsReturningUser());
//
//     fetcher.patch(`/api/v1/users/${userId}/new-user`, (json) => {
//       if (json.error)
//         return dispatch(USER_ACTIONS.errorMarkingAsReturningUser(json.error));
//
//       return dispatch(USER_ACTIONS.markedAsReturningUser());
//     });
//   };
// };
