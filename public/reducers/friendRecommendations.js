const friendRecommendationsReducer = (state = { data: [] }, action) => {
	switch (action.type) {
		case 'FETCHING_FRIEND_RECS':
			return {
				...state,
				isPending: true,
			};

		case 'FETCHING_FRIEND_RECS_SUCCESS':
			return {
				...state,
				isPending: false,
				data: action.payload.friendRecs,
			};

		case 'FETCHING_FRIEND_RECS_ERROR':
			return {
				...state,
				isPending: false,
				error: action.payload.error,
			};

		default:
			return state;
	}
};

export default friendRecommendationsReducer;
