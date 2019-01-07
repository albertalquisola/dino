import _ from 'lodash';
import PropTypes from 'prop-types';

import BaseModel from 'isomorphic/models/BaseModel';
import GooglePlace from 'isomorphic/models/GooglePlace';
import YelpPlace from 'isomorphic/models/YelpPlace';

export default class Place extends BaseModel {
  constructor(props) {
    super(props);

    this.id = props.id;
    this.googlePlaceId = props.googlePlaceId;
    this.googlePlaceData = new GooglePlace(props.googlePlaceData);
    this.yelpPlaceData = new YelpPlace(props.yelpPlaceData);
  }

  getName() {
    return this.googlePlaceData.name || this.yelpPlaceData.name;
  }

  getCategories() {
    return this.yelpPlaceData.getCategoryNames() || this.googlePlaceData.getTypes();
  }

  getLocation() {
    const neighborhood = _.find(this.googlePlaceData.address_components, (ac) => {
      return _.includes(ac.types, 'neighborhood');
    });

    return _.get(neighborhood, 'long_name', null) || this.yelpPlaceData.location.city || this.googlePlaceData.getCity();
  }

  getPriceRange() {
    return this.yelpPlaceData.price || this.googlePlaceData.price_level;
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
