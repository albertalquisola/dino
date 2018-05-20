import PropTypes from 'prop-types';

import BaseModel from 'isomorphic/models/BaseModel';
import GooglePlace from 'isomorphic/models/GooglePlace';
import YelpPlace from 'isomorphic/models/YelpPlace';

export default class Place extends BaseModel {
  constructor(props) {
    super(props);

    this.id = props.id;
    this.googlePlaceId = props.googlePlaceId;
    this.googlePlace = new GooglePlace(props.googlePlaceData);
    this.yelpPlace = new YelpPlace(props.yelpPlaceData);
  }

  static get propTypes() {
    return {
      id: PropTypes.string.isRequired,
      googlePlaceId: PropTypes.string.isRequired,
      googlePlace: PropTypes.instanceOf(GooglePlace),
      yelpPlace: PropTypes.instanceOf(YelpPlace),
    };
  }
}
