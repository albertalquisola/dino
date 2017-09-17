import React from 'react';
import { Link } from 'react-router';

import Copyright from 'components/reusable/CopyrightFooter';

class PrivacyPolicyMsg extends React.Component {
  render() {
    const copyright = <Copyright />;
    return (
      <div className="privacy-policy-container">
        <div className="privacy-policy">
          By clicking the "Request Access" button, you are agreeing to our &nbsp;
          <Link to="/privacy-policy">Privacy Policy</Link>.
        </div>
        {copyright}
      </div>
    );
  }
}

module.exports = PrivacyPolicyMsg;
