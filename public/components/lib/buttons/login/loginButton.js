import _ from 'lodash';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import LoginModalActions from 'actions/loginModal';

class LoginButton extends React.Component {
  render() {
    if (this.props.isLoggedIn)
      return null;

    return (
      <button onClick={this.props.showLoginModal} className="btn login-button">
        Log In / Sign Up
      </button>
    );
  }
}

LoginButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  showLoginModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!_.get(state, 'user.isLoggedIn'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showLoginModal: () => dispatch(LoginModalActions.showLoginModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
