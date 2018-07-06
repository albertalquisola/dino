import PropTypes from 'prop-types';

import BaseModel from 'isomorphic/models/BaseModel';

export default class User extends BaseModel {
  constructor(props) {
    super(props);

    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.profilePic = props.profilePic;

    super.checkPropTypes();
  }

  static get propTypes() {
    return {
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      profilePic: PropTypes.string.isRequired,
    };
  }
}
