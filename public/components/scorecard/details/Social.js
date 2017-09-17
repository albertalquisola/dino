import React from 'react';

import config from 'config';

import AddSocialModal from 'containers/AddSocialModal';
import NotConnected from 'components/reusable/scorecard/NotConnected';
import Connected from 'components/reusable/scorecard/Connected';
import Copyright from 'components/reusable/CopyrightFooter';

class Social extends React.Component {
  render() {
    const copyright = <Copyright />;
    const addSocialModal = (<AddSocialModal companyId={this.props.scorecard.companyId}
                                            domainName={this.props.scorecard.domainName}
                                            requestId={this.props.requestId} />);
    const notConnected = [];
    const connected = [];

    let coinColorClass;

    this.props.scorecard.social.accounts.notConnected.forEach((account) => {
      notConnected.push(<NotConnected name={account.name}
                                      friendlyName={account.friendlyName}
                                      key={account.name}
                                      domainName={this.props.scorecard.domainName}
                                      companyId={this.props.scorecard.companyId}
                                      hasNoAccount={this.props.hasNoAccount}
                                      requestId={this.props.requestId}
                                      showSocialModal={this.props.showSocialModal}
                        />);
    });

    this.props.scorecard.social.accounts.connected.forEach((account) => {
      if (account.metrics) {
        connected.push(<Connected name={account.name}
                                  friendlyName={account.friendlyName}
                                  key={account.name}
                                  domainName={this.props.scorecard.domainName}
                                  metrics={account.metrics}
                       />);
      }
    });

    switch (this.props.gradeColor) {
      case (config.aColor):
        coinColorClass = 'a-bg-grade-color';
        break;

      case (config.bColor):
        coinColorClass = 'b-bg-grade-color';
        break;

      case (config.cColor):
        coinColorClass = 'c-bg-grade-color';
        break;

      case (config.dColor):
        coinColorClass = 'd-bg-grade-color';
        break;

      case (config.fColor):
        coinColorClass = 'f-bg-grade-color';
        break;

      case ('-'):
        coinColorClass = 'f-bg-grade-color';
        break;

      default:
        throw new Error('couldn\'t match gradeColor!');
    }

    return (
      <div className="social">
        {addSocialModal}
        <h1>
          {this.props.category}
        </h1>

        <div className="score-coin-container">
          <div className="score-coin mobile-coin">
            <div className={`${coinColorClass} coin-circle`}>
              <span className="grade tk-bookmania">{this.props.grade}</span>
            </div>
          </div>
        </div>

        <div className="rules-container">
          <div className="title">
            {this.props.scorecard.social.title}
          </div>

          <div className="explanation-text-top">
            Traffic from mobile devices is growing fast. Optimize your website for <br />
            mobile or you'll miss out on valuable traffic, leads, and revenue.
          </div>

          <div className="explanation-text-bottom tk-bookmania">
            People are five times more likely to leave a mobile site that isn't mobile friendly. Nicely done. It
            looks like people visiting {this.props.scorecard.domainName} on their mobile phones experience a well-designed
            mobile site.
          </div>

          <div className="bar"></div>

          <div className="speed-title">Let's get up to speed</div>
          <div className="speed-text">Here are the key items you should work on to get this score up, ranked by urgency:</div>

          <div className="rules">
            {connected}
            {notConnected}
          </div>

          <div className="copyright-container">
            {copyright}
          </div>
        </div>
      </div>
    );
  }
}

Social.propTypes = {
  requestId: React.PropTypes.string.isRequired,
  hasNoAccount: React.PropTypes.func.isRequired,
  showSocialModal: React.PropTypes.func.isRequired,
  category: React.PropTypes.string.isRequired,
  grade: React.PropTypes.string.isRequired,
  gradeColor: React.PropTypes.string.isRequired,

  scorecard: React.PropTypes.shape({
    domainName: React.PropTypes.string,
    companyId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]).isRequired,

    scores: React.PropTypes.shape({
      desktop: React.PropTypes.string,
      mobile: React.PropTypes.string,
      social: React.PropTypes.string,
      seo: React.PropTypes.string,
    }),

    fetchedScorecard: React.PropTypes.bool,
    fetchingScorecard: React.PropTypes.bool,

    desktop: React.PropTypes.shape({
      base64Image: React.PropTypes.string,
      formattedResults: React.PropTypes.object
    }),

    mobile: React.PropTypes.shape({
      base64Image: React.PropTypes.string,
      formattedResults: React.PropTypes.object,
    }),

    seo: React.PropTypes.shape({

    }),

    social: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      accounts: React.PropTypes.shape({
        notConnected: React.PropTypes.array.isRequired,
        connected: React.PropTypes.array.isRequired
      })
    })
  }).isRequired
};

module.exports = Social;
