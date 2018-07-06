import _ from 'lodash';

import Recommendation from 'isomorphic/models/Recommendation';
import fetcher from 'util/fetcher';

const REC_ACTIONS = {
  fetchFriendRecs: () => {
    return { type: 'FETCHING_FRIEND_RECS' };
  },

  fetchFriendRecsSuccess: (friendRecs) => {
    return {
      type: 'FETCHING_FRIEND_RECS_SUCCESS',
      payload: { friendRecs },
    };
  },

  fetchFriendRecsError: (error) => {
    return {
      type: 'FETCHING_FRIEND_RECS_ERROR',
      payload: { error },
    };
  },

  fetchUserRecs: () => {
    return { type: 'FETCHING_USER_RECS' };
  },

  fetchUserRecsSuccess: (userRecs) => {
    return {
      type: 'FETCHING_USER_RECS_SUCCESS',
      payload: { userRecs },
    };
  },

  fetchUserRecsError: (error) => {
    return {
      type: 'FETCHING_USER_RECS_ERROR',
      payload: { error },
    };
  },

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

export function fetchUserRecommendations(userId) {
  return async (dispatch) => {
    dispatch(REC_ACTIONS.fetchUserRecs());

    try {
      const response = await fetcher.get(`/api/v1/users/${userId}/recommendations`);
      if (response.error)
        return dispatch(REC_ACTIONS.fetchUserRecsError(response.error));

      return dispatch(REC_ACTIONS.fetchUserRecsSuccess(response.recommendations));
    } catch (error) {
      return dispatch(REC_ACTIONS.fetchUserRecsError(error));
    }
  };
}

export function saveRecommendation(placeId, recommendation, status) {
  return async (dispatch, getState) => {
    if (status !== 'OK')
      return dispatch(REC_ACTIONS.saveRecError(new Error('unable to fetch location details')));

    dispatch(REC_ACTIONS.saveRec());

    const userId = _.get(getState(), 'user.data.id');
    if (!userId)
      return dispatch(REC_ACTIONS.fetchFriendRecsError(new Error('unable to get user ID for user!')));

    try {
      const response = await fetcher.post(`/api/v1/users/${userId}/recommendations`, { placeId, recommendation });
      if (response.error)
        return dispatch(REC_ACTIONS.saveRecError(response.error));

      return dispatch(REC_ACTIONS.saveRecSuccess(response.recommendation));
    } catch (error) {
      return dispatch(REC_ACTIONS.saveRecError(error));
    }
  };
}

export function getFriendRecommendations(placeId) {
  return async (dispatch, getState) => {
    dispatch(REC_ACTIONS.fetchFriendRecs());

    const userId = _.get(getState(), 'user.data.id');
    if (!userId)
      return dispatch(REC_ACTIONS.fetchFriendRecsError(new Error('unable to get user ID for user!')));

    let response;
    try {
      response = await fetcher.get(`/api/v1/users/${userId}/friends-recommendations`, { placeId });
    } catch (error) {
      return dispatch(REC_ACTIONS.fetchFriendRecsError(error));
    }

    if (response.error)
      return dispatch(REC_ACTIONS.fetchFriendRecsError(response.error));

    const recommendations = _.map(response.friendRecommendations, (rec) => new Recommendation(rec));
    return dispatch(REC_ACTIONS.fetchFriendRecsSuccess(recommendations));
  };
}

export default {
  getFriendRecommendations,
  fetchUserRecommendations,
  saveRecommendation,
};
