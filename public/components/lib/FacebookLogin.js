import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

class FacebookLogin extends React.Component {
  componentWillMount() {
    this.props.loadFacebookSDK();
  }

  render() {
    return (
      <button onClick={this.props.loginWithFacebook}>Log In with Facebook</button>
    );
  }
}

FacebookLogin.propTypes = {
  loadFacebookSDK: PropTypes.func.isRequired,
  loginWithFacebook: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFacebookSDK,
    loginWithFacebook: () => { window.location.href = `${window.location.origin}/auth/facebook`; },
  };
};

export default connect(null, mapDispatchToProps)(FacebookLogin);

function loadFacebookSDK() {
  window.fbAsyncInit = () => {
    FB.init({
      // todo: dont hardcode app ID here
      appId: '1160568094043621',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v2.10',
    });
    FB.AppEvents.logPageView();
  };

  (function (d, s, id) {
    let js,
fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}
