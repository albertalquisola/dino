import React from 'react';
import _ from 'lodash';

import config from 'config';
import SeoSection from 'components/reusable/scorecard/SeoSection';
import Copyright from 'components/reusable/CopyrightFooter';

class Seo extends React.Component {
  render() {
    const copyright = <Copyright />;
    const sections = [];

    let coinColorClass;

    _.forOwn(this.props.scorecard.seo.metrics, (value, key) => {
      const section = this.props.scorecard.seo.metrics[key];
      sections.push(<SeoSection sectionName={key}
                                sectionColor={section.color}
                                key={key}
                                friendlyName={section.friendlyName}
                                metrics={section.metrics}
                                 />);
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
       <div className="seo">
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
            {this.props.scorecard.seo.title}
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
            {sections}
          </div>

          <div className="copyright-container">
            {copyright}
          </div>
        </div>
      </div>
    );
  }
}

Seo.propTypes = {
  category: React.PropTypes.string.isRequired,
  grade: React.PropTypes.string.isRequired,
  gradeColor: React.PropTypes.string.isRequired,

  scorecard: React.PropTypes.shape({
    domainName: React.PropTypes.string,

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
      formattedResults: React.PropTypes.object,
    }),

    mobile: React.PropTypes.shape({
      base64Image: React.PropTypes.string,
      formattedResults: React.PropTypes.object,
    }),

    seo: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      metrics: React.PropTypes.object.isRequired,
    }),

    social: React.PropTypes.shape({

    }),
  }).isRequired,
};

module.exports = Seo;
