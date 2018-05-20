import React from 'react';

export default () => {
  return (<button onClick={loginWithFacebook}>Log In with Facebook</button>);
};

function loginWithFacebook() {
  window.location.href = `${window.location.origin}/auth/facebook`;
}
