import React from 'react';

export default () => {
  return (
    <button className="facebookLogin-loginBtn loginBtn--facebook" onClick={loginWithFacebook}>
      Login with Facebook
    </button>
  );
};

function loginWithFacebook() {
  window.location.href = `${window.location.origin}/auth/facebook`;
}
