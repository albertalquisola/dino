import _ from 'lodash';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCHING_USER':
      return {
        ...state,
        isPending: true,
      };

    case 'FETCHING_USER_SUCCESS':
      return {
        ...state,
        isLoggedIn: !_.isEmpty(action.payload.user),
        data: action.payload.user,
        isPending: false,
      };

    case 'FETCHING_USER_ERROR':
      return {
        ...state,
        ...action.payload.error,
        isPending: false,
      };

    default:
      return state;
  }
};

export default userReducer;
