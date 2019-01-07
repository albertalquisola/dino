import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { connect } from 'react-redux';

import actions from 'actions';
import Headerbar from 'components/lib/headerbar/Headerbar';
import RecCard from 'components/lib/recCard/RecCard';

class FriendRecommendations extends React.Component {
	componentWillMount() {
		if (this.props.placeId) {
			this.props.setCurrentCity(this.props.cityName, this.props.placeId);
			this.props.searchForCityRecs(this.props.placeId);
		}
	}

	render() {
		const recs = this.props.friendRecs;
		const friendRecs = _.map(recs, (rec, index) => <RecCard rec={rec} key={index} />);

		return (
			<div className="FriendRecs-friends-recommendations">
				<Headerbar showSearchbar={true} />
				<div className="metadata-container">
					<span className="city-name">{this.props.cityName}</span>
				</div>

				<div className="friend-recs-container">
					<div className="friend-recs-list">
							{friendRecs}
					</div>
				</div>
			</div>
		);
	}
}

FriendRecommendations.propTypes = {
	cityName: PropTypes.string,
	friendRecs: PropTypes.array.isRequired,
	placeId: PropTypes.string,
	setCurrentCity: PropTypes.func.isRequired,
	searchForCityRecs: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
	const params = queryString.parse(props.location.search);

	return {
		cityName: params.city,
		friendRecs: _.get(state, 'friendRecommendations.data', []),
		placeId: params.placeId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentCity: (cityName, placeId) => dispatch(actions.city.setCurrentCity(cityName, placeId)),
		searchForCityRecs: (placeId) => dispatch(actions.recommendation.getFriendRecommendations(placeId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRecommendations);
