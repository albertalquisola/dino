const cityReducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_CURRENT_CITY':
			return {
				...state,
				address: action.payload.address,
				placeId: action.payload.placeId,
			};

		default:
			return state;
	}
};

export default cityReducer;
