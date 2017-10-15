import _ from 'lodash';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCHING_USER':
      return {
        ...state,
        isFetching: true,
      };

    case 'FETCHING_USER_SUCCESS':
      return {
        ...state,
        isLoggedIn: !_.isEmpty(action.payload.user),
        data: action.payload.user,
        isFetching: false,
      };

    case 'FETCHING_USER_ERROR':
      return {
        ...state,
        ...action.payload.error,
        isFetching: false,
      };

    default:
      return state;
  }
};

module.exports = userReducer;
