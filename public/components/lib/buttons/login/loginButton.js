import React from 'react';
import PropTypes from 'prop-types';

export default class LoginButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.showLoginModal} className="btn login-button">Log In / Sign Up</button>);
  }
}

LoginButton.propTypes = {
  showLoginModal: PropTypes.func.isRequired,
};
