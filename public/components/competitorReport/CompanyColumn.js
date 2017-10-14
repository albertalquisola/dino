import _ from 'lodash';
import React from 'react';

import config from 'config';

class CompanyColumn extends React.Component {
  getColor(score) {
    let coinColorClass;
    score = score[0].toLowerCase();

    switch (score) {
      case ('a'):
        coinColorClass = 'green';
        break;

      case ('b'):
        coinColorClass = 'orange';
        break;

      case ('c'):
        coinColorClass = 'orange';
        break;

      case ('d'):
        coinColorClass = 'red';
        break;

      case ('f'):
        coinColorClass = 'red';
        break;

      default:
        throw new Error('couldn\'t match gradeColor!');
    }

    return coinColorClass;
  }

  getSeoSection(seo) {
    const seoSection = [];

    seoSection.push(
      <div key="seo" className="score-badge-container">
        <div className="seo-score score-badge">
          <div className={`score-circle ${this.getColor(seo.score)}`}>
            <span className="score">{seo.score}</span>
          </div>
        </div>
      </div>
    );

    seoSection.push(<div key="fekafjaek" className="empty-section-title-box"></div>);

    _.each(seo.metrics.search.metrics, (metric) => {
      seoSection.push(
        <div key={metric.friendlyName} className="cell">
          <div className={`${metric.color} seo-metric-score`}>{metric.score}</div>
        </div>
      );
    });

    seoSection.push(<div key="fekfa" className="empty-section-title-box"></div>);

    _.each(seo.metrics.links.metrics, (metric) => {
      seoSection.push(
        <div key={metric.friendlyName} className="cell">
          <div className={`${metric.color} seo-metric-score`}>{metric.score}</div>
        </div>
      );
    });

    seoSection.push(<div key="fjekajfea" className="empty-section-title-box"></div>);

    _.each(seo.metrics.security.metrics, (metric) => {
      seoSection.push(
        <div key={metric.friendlyName} className="cell">
          <div className={`${metric.color} small-bullets`}></div>
        </div>
      );
    });

    return seoSection;
  }

  getSocialSection(social) {
    const socialSection = [];

    socialSection.push(
      <div key="social" className="score-badge-container">
        <div className="social-score score-badge">
          <div className={`score-circle ${this.getColor(social.score)}`}>
            <span className="score">{social.score}</span>
          </div>
        </div>
      </div>
    );

    // BAD. PLEASE FIX.
    _.each(config.social.list, (accountName) => {
      let connectedAccount;

      socialSection.push(<div key={accountName} className="empty-section-title-box"></div>);
      _.each(social.accounts.connected, (account) => {
        if (account.name === accountName)
          connectedAccount = account;
      });

      if (connectedAccount) {
        _.each(connectedAccount.metrics, (metric) => {
          // BAD. HACK FOR TWITTER ISVERIFIED
          if (metric.friendlyName === 'Verified Account') {
            socialSection.push(
              <div className="cell" key={`${connectedAccount.friendlyName}${metric.friendlyName}`}>
                <div className={`${metric.color} small-bullets`}></div>
              </div>
            );
          } else {
            _.each(metric.text, (text, index) => {
              if (text.isBold)
                socialSection.push(
                  <div className="cell" key={`${text.text}${index}`}>
                    <div className={metric.color}>{text.text}</div>
                  </div>
                );
            });
          }
        });

      } else {
        _.times(config.social[accountName].length, (index) => {
          socialSection.push(
            <div className="cell" key={`${accountName}${index}`}>
              <div className="gray-bullet">-</div>
            </div>
          );
        });
      }
    });

    return socialSection;
  }

  getMobileSection(mobile) {
    const mobileSection = [];

    mobileSection.push(
      <div key="mobile" className="score-badge-container">
        <div className="mobile-score score-badge">
          <div className={`score-circle ${this.getColor(mobile.score)}`}>
            <span className="score">{mobile.score}</span>
          </div>
        </div>
      </div>
    );

    _.each(mobile.rules, (rule, index) => {
      mobileSection.push(
        <div key={index} className="bullet-container cell">
          <div className={`small-bullets ${rule.color}`}></div>
        </div>
      );
    });

    return mobileSection;
  }

  getDesktopSection(desktop) {
    const desktopSection = [];

    desktopSection.push(
      <div key="desktop" className="score-badge-container">
        <div className="desktop-score score-badge">
          <div className={`score-circle ${this.getColor(desktop.score)}`}>
            <span className="score">{desktop.score}</span>
          </div>
        </div>
      </div>
    );

    _.each(desktop.rules, (rule, index) => {
      desktopSection.push(
        <div key={index} className="bullet-container cell">
          <div className={`small-bullets ${rule.color}`}></div>
        </div>
      );
    });

    return desktopSection;
  }

  render() {
    const seoSection = this.getSeoSection(this.props.company.seo);
    const mobileSection = this.getMobileSection(this.props.company.mobile);
    const desktopSection = this.getDesktopSection(this.props.company.desktop);
    const socialSection = this.getSocialSection(this.props.company.social);

    let column;

    if (this.props.isMain) {
      column = (
        <div className="main-company-column">
          <div key={this.props.company.companyId} className="company-stag">
            <div className="main-company-stag-img">
              <img alt="main-company" src="/public/images/SmallStag_gold.png" />
            </div>
            <div className="main-company-name tk-bookmania">{this.props.company.domainName}</div>
          </div>
          {seoSection}
          {mobileSection}
          {desktopSection}
          {socialSection}
        </div>);

    } else {
      column = (
        <div className="competitor-company-column">
          <div className="competitor-stag">
            <div className="competitor-stag-img">
              <img alt="competitor" src="/public/images/SmallStag_grey.png" />
            </div>
            <div className="competitor-company-name tk-bookmania">{this.props.company.domainName}</div>
          </div>
          {seoSection}
          {mobileSection}
          {desktopSection}
          {socialSection}
        </div>);
    }

    return (
      <div className="column">
        {column}
      </div>
    );
  }
}

CompanyColumn.propTypes = {
  company: React.PropTypes.shape({
    companyId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    requestId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]).isRequired,
    domainName: React.PropTypes.string.isRequired,
    seo: React.PropTypes.object.isRequired,
    social: React.PropTypes.object.isRequired,
    mobile: React.PropTypes.object.isRequired,
    desktop: React.PropTypes.object.isRequired,
  }).isRequired,
  isMain: React.PropTypes.bool,
};

module.exports = CompanyColumn;
