import React from 'react';

import config from 'config';
import SocialMetrics from 'components/scorecard/accounts/SocialMetrics';

class Connected extends React.Component {
  render() {
    let connectedDetails;

    if (this.props.name === config.accounts.facebook ||
        this.props.name === config.accounts.twitter ||
        this.props.name === config.accounts.googleplus ||
        this.props.name === config.accounts.pinterest) {

      connectedDetails = <SocialMetrics domainName={this.props.domainName} metrics={this.props.metrics} />;
    }

    return (
      <div className="connected-container">
        <div className={`social-logo ${this.props.name} connected`}></div>
        <div className={`connected ${this.props.name}`}></div>
        <div className="account-name">{this.props.friendlyName}</div>
        <div className="bar"></div>

        {connectedDetails}
      </div>
    );
  }
}

Connected.propTypes = {
  domainName: React.PropTypes.string.isRequired,
  friendlyName: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  metrics: React.PropTypes.array,
};

module.exports = Connected;