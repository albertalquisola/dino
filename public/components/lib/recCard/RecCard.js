import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Recommendation from 'isomorphic/models/Recommendation';
import FriendBubble from 'components/lib/friendBubble/FriendBubble';

export default class RecCard extends React.Component {
	render() {
		const recommendation = this.props.rec;
		const name = recommendation.name;
		const categories = recommendation.categories;
		const location = recommendation.location;
		const priceRange = recommendation.priceRange;
		const friends = _.map(recommendation.friends, (f, index) => <FriendBubble key={index} friend={f} />);

		return (
			<div className="RecCard-container">
					<div className="name-type-location-container">
						<div className="name">{name}</div>
						<div className="types">{categories}</div>
						<div className="location">{location}</div>
					</div>
				<div className="price-range-friend-bubbles-container">
						<div className="price-range">{priceRange}</div>
						<div className="friend-bubbles">{friends}</div>
					</div>
			</div>
		);
	}
}

RecCard.propTypes = {
  rec: PropTypes.instanceOf(Recommendation).isRequired,
};
