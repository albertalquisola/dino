import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown, MenuItem } from 'react-bootstrap';

class LoggedInButton extends React.Component {
  render() {
    if (!this.props.isLoggedIn)
      return null;

    return (
      <div className="user-settings-container">
        <Dropdown id="user-settings-dropdown">
          <Dropdown.Toggle noCaret={true}>
            <span className="bubble-name">{this.props.bubbleName}</span>
            <span className="display-name">{this.props.displayName}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu-right">
            <MenuItem eventKey="1">Settings</MenuItem>
            <MenuItem href="/auth/logout" eventKey="1">Log Out</MenuItem>
          </Dropdown.Menu>
        </Dropdown>
        </div>
    );
  }
}

LoggedInButton.propTypes = {
  bubbleName: PropTypes.string,
  displayName: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const firstName = _.get(state, 'user.data.firstName') || 'User';
  const firstNameInitial = _.first(_.get(state, 'user.data.firstName'));
  const lastNameInitial = _.first(_.get(state, 'user.data.lastName'));

  const displayName = firstName !== 'User' && lastNameInitial ?
    `${firstName} ${lastNameInitial}.` : `${firstName}`;

  const bubbleName = firstNameInitial && lastNameInitial ?
    `${firstNameInitial}${lastNameInitial}`.toUpperCase() : null;

  return {
    bubbleName,
    displayName,
    isLoggedIn: !!_.get(state, 'user.isLoggedIn'),
  };
};

export default connect(mapStateToProps)(LoggedInButton);
