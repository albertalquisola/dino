import React from 'react';
import { Link } from 'react-router';

import Copyright from 'components/reusable/CopyrightFooter';

class TermsOfServiceMsg extends React.Component {
  render() {
    const copyright = <Copyright />;
    return (
      <div className="terms-of-service-container">
        <div className="terms-of-service">
          By clicking the "Enter" button, you are agreeing to our &nbsp;
          <Link to="/terms-of-service">Terms of Service</Link>.
        </div>
        {copyright}
      </div>
    );
  }
}

module.exports = TermsOfServiceMsg;
