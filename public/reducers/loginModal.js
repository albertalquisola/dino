const loginModalReducer = (state = { show: false }, action) => {
  switch (action.type) {
    case 'SHOW_LOGIN_MODAL':
      return {
        ...state,
        show: true,
      };

    case 'HIDE_LOGIN_MODAL':
      return {
        ...state,
        show: false,
      };

    default:
      return state;
  }
};

export default loginModalReducer;
