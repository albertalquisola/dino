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
    this.googlePlace = new GooglePlace(props.googlePlaceData);
    this.yelpPlace = new YelpPlace(props.yelpPlaceData);
  }

  getName() {
    return this.googlePlace.name || this.yelpPlace.name;
  }

  getCategories() {
    return this.yelpPlace.getCategoryNames() || this.googlePlace.getTypes();
  }

  getLocation() {
    const neighborhood = _.find(this.googlePlace.address_components, (ac) => {
      return _.includes(ac.types, 'neighborhood');
    });

    return _.get(neighborhood, 'long_name', null) || this.yelpPlace.location.city || this.googlePlace.getCity();
  }

  getPriceRange() {
    return this.yelpPlace.price || this.googlePlace.price_level;
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
