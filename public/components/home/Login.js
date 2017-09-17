import React from 'react';
import PrivacyPolicyMsg from 'components/reusable/PrivacyPolicyMsg';

class Login extends React.Component {
  linkedinRedirect() {
    window.location.href = `${window.location.origin}/linkedin/oauth`;
  }

  render() {
    const privacyPolicyMsg = <PrivacyPolicyMsg />;
    return (
      <div className="login">
        <div className="stag-large-container">
          <div className="stag-image-large"></div>
        </div>

        <div className="btn btn-info linkedin-auth-btn" onClick={this.linkedinRedirect}>
          Request Access
        </div>

        {privacyPolicyMsg}
      </div>
    );
  }
}

module.exports = Login;