import fetcher from 'util/fetcher';

const SEARCH_ACTIONS = {
  saveSearch: () => {
    return { type: 'SAVE_SEARCH' };
  },

  saveSearchSuccess: (payload) => {
    return { type: 'SAVE_SEARCH_SUCCESS', payload };
  },

  saveSearchError: (error) => {
    return { type: 'SAVE_SEARCH_ERROR', error };
  },
};

export function saveSearch(place, status) {
  return async (dispatch, getState) => {
    // trigger pending state
    dispatch(SEARCH_ACTIONS.saveSearch());

    try {
      const response = await fetcher.post('/testEndpoint');
      dispatch(SEARCH_ACTIONS.saveSearchSuccess(response));
    } catch (error) {
      dispatch(SEARCH_ACTIONS.saveSearchError(error));
    }
  };
}
