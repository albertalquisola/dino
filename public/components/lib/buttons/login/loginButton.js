import _ from 'lodash';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import LoginModalActions from 'actions/loginModal';

class LoginButton extends React.Component {
  constructor(props) {
    super(props);

    this.showLoginModal = this.showLoginModal.bind(this);
  }

  showLoginModal() {
    if (!this.props.isLoggedIn)
      this.props.showLoginModal();
  }

  render() {
    const buttonText = this.props.isLoggedIn ? `Hi, ${this.props.name}!` : 'Log In / Sign Up';
    return (<button onClick={this.showLoginModal} className="btn login-button">{buttonText}</button>);
  }
}

LoginButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  name: PropTypes.string,
  showLoginModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.user.isLoggedIn,
    name: _.get(state, 'user.data.first_name'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showLoginModal: () => dispatch(LoginModalActions.showLoginModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
