import fetcher from 'util/fetcher';

const REC_ACTIONS = {
    saveRec: () => {
      return { type: 'SAVE_REC' };
    },

    saveRecSuccess: (rec) => {
      return {
        type: 'SAVE_REC_SUCCESS',
        payload: { rec },
      };
    },

  saveRecError: (error) => {
    return {
      type: 'SAVE_REC_ERROR',
      payload: { error },
    };
  },
};

export function saveRecommendation(placeId, recommendation, status) {
  return async (dispatch) => {
    if (status !== 'OK')
      return dispatch(REC_ACTIONS.saveRecError(new Error('unable to fetch location details')));

    let response;
    dispatch(REC_ACTIONS.saveRec());

    try {
      response = await fetcher.post('api/v1/recs', { placeId, recommendation });
      if (response.error)
        return dispatch(REC_ACTIONS.saveRecError(response.error));

      // TODO: [Albert]
      // need to cast this into a proper model vs. just sending the json through
      return dispatch(REC_ACTIONS.saveRecSuccess(response.recommendation));
    } catch (error) {
      return dispatch(REC_ACTIONS.saveRecError(error));
    }
  };
}
