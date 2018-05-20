import React from 'react';
import PropTypes from 'prop-types';

export default class RecCard extends React.Component {
	render() {
		const place = this.props.rec.place.googlePlaceData || this.props.rec.place.yelpPlaceData;

		return (
			<div className="rec-card">
				<div className="name">{this.props.rec.name}</div>
			</div>
		);
	}
}

RecCard.propTypes = {
	// change to shapeOf or instanceOf check
  rec: PropTypes.object.isRequired,
};
