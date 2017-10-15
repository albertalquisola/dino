const recommendationsReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case 'SAVE_REC':
      return {
        ...state,
        isPending: true,
      };
    case 'SAVE_REC_SUCCESS':
      return {
        ...state,
        isPending: false,
        data: [...state.data, action.payload.rec],
      };

    case 'SAVE_REC_ERROR':
      return {
        ...state,
        isPending: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default recommendationsReducer;
