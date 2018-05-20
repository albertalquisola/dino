import _ from 'lodash';
import PropTypes from 'prop-types';

import Place from 'isomorphic/models/Place';
import User from 'isomorphic/models/User';
import BaseModel from 'isomorphic/models/BaseModel';

export default class Recommendation extends BaseModel {
  constructor(props) {
    super(props);

    this.count = props.count;
    this.friends = _.map(props.friends, (friend) => new User(friend));
    this.place = new Place(props.place);

    super.checkPropTypes();
  }

  static get propTypes() {
    return {
      count: PropTypes.number.isRequired,
      friends: PropTypes.arrayOf(PropTypes.instanceOf(User)).isRequired,
      place: PropTypes.instanceOf(Place).isRequired,
    };
  }
}
