import _ from 'lodash';
import PropTypes from 'prop-types';

import Place from 'isomorphic/models/Place';
import User from 'isomorphic/models/User';
import BaseModel from 'isomorphic/models/BaseModel';

export default class Recommendation extends BaseModel {
  constructor(props) {
    super(props);

    this.place = new Place(props.place);
    this.count = props.count;
    this.friends = _.map(props.friends, (friend) => new User(friend));

    super.checkPropTypes();
  }

  get name() {
    return this.place.getName();
  }

  get categories() {
    return this.place.getCategories();
  }

  get location() {
    return this.place.getLocation();
  }

  get priceRange() {
    return this.place.getPriceRange();
  }

  static get propTypes() {
    return {
      count: PropTypes.number.isRequired,
      friends: PropTypes.arrayOf(PropTypes.instanceOf(User)).isRequired,
      place: PropTypes.instanceOf(Place).isRequired,
    };
  }
}
