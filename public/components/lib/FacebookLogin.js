import React from 'react';

class FacebookLogin extends React.Component {
  constructor(props) {
    super(props);

    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
  }

  componentWillMount() {
    loadFacebookSDK();
  }

  statusChangeCallback(response) {
    switch (response.status) {
      case 'connected':
        console.log('connected biatch');
        console.log('break here');
        break;

      case 'not_authorized':
        console.log('not authorized');
        break;

      default:
        console.log('please log in');
    }
  }

  handleFacebookLogin() {
    FB.login(this.statusChangeCallback, { scope: 'email, public_profile, user_friends' });
  }

  render() {
    return (
      <button onClick={this.handleFacebookLogin}>Sign up with Facebook</button>
    );
  }
}

function loadFacebookSDK() {
  window.fbAsyncInit = () => {
    FB.init({
      appId            : '1160568094043621',
      autoLogAppEvents : true,
      xfbml            : true,
      version : 'v2.10',
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

FacebookLogin.propTypes = {};

export default FacebookLogin;
