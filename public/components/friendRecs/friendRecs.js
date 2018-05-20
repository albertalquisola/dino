import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Headerbar from 'components/lib/headerbar/Headerbar';
import RecCard from 'components/lib/recCard/RecCard';

class FriendRecommendations extends React.Component {
	render() {
		const friendRecs = _.map(this.props.friendRecs, (friendRec, index) => <RecCard rec={friendRec} key={index} />);

		return (
			<div className="friends-recommendations">
				<Headerbar showSearchbar={true} />
				<div className="metadata-container">
					<span className="city-name">{this.props.cityName}</span>
				</div>

				<div className="friend-recs-container">
						{friendRecs}
				</div>
			</div>
		);
	}
}

FriendRecommendations.propTypes = {
	cityName: PropTypes.string.isRequired,
	friendRecs: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
	return {
		cityName: _.get(state, 'currentCity.address', 'Results'),
		friendRecs: _.get(state, 'friendRecommendations.data', []),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRecommendations);
