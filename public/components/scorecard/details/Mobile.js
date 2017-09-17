import React from 'react';

import config from 'config';
import RuleRow from 'components/reusable/scorecard/RuleRow';
import Copyright from 'components/reusable/CopyrightFooter';

class Mobile extends React.Component {
  render() {
    const copyright = <Copyright />;
    const rules = this.props.scorecard.mobile.rules;
    const mustFix = [];
    const shouldFix = [];
    const onTarget = [];

    let coinColorClass;

    rules.mustFix.forEach((rule) => {
      mustFix.push(<RuleRow className="mustfix-rule"
                            key={rule.localizedRuleName}
                            bulletColor="red-bullet"
                            rule={rule.localizedRuleName} />);
    });

    rules.shouldFix.forEach((rule) => {
      shouldFix.push(<RuleRow className="shouldfix-rule"
                              key={rule.localizedRuleName}
                              bulletColor="orange-bullet"
                              rule={rule.localizedRuleName} />);
    });

    rules.onTarget.forEach((rule) => {
      onTarget.push(<RuleRow className="ontarget-rule"
                             key={rule.localizedRuleName}
                             bulletColor="green-bullet"
                             rule={rule.localizedRuleName} />);
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
      <div className="mobile">
        <h1>
          {this.props.category}
        </h1>

        <div className="iphone-container">
          <img className="iphone" src="/public/images/mobile_image_399x214.png" alt="iphone" />
          <img className="mobile-screenshot"
               src={`data:image/jpeg;base64, ${this.props.scorecard.mobile.base64Image}`}
               alt="mobile screenshot" />
        </div>

        <div className="score-coin-container">
          <div className="score-coin mobile-coin">
            <div className={`${coinColorClass} coin-circle`}>
              <span className="grade tk-bookmania">{this.props.grade}</span>
            </div>
          </div>
        </div>

        <div className="rules-container">
          <div className="title">
            {this.props.scorecard.mobile.title}
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
            <div className="bullets red-bullet"></div>
            <div className="mustfix-rules">
              <div>high priority</div>
              <div className="bar rulebar"></div>
              {mustFix}
            </div>

            <div className="bullets orange-bullet"></div>
            <div className="shouldfix-rules">
              <div>needs some work</div>
              <div className="bar rulebar"></div>
              {shouldFix}
            </div>

            <div className="bullets green-bullet"></div>
            <div className="shouldfix-rules">
              <div>On Target</div>
              <div className="bar rulebar"></div>
              {onTarget}
            </div>
          </div>
          <div className="copyright-container">
            {copyright}
          </div>
        </div>
      </div>
    );
  }
}

Mobile.propTypes = {
  category: React.PropTypes.string.isRequired,
  grade: React.PropTypes.string.isRequired,
  gradeColor: React.PropTypes.string.isRequired,

  scorecard: React.PropTypes.shape({
    domainName: React.PropTypes.string.isRequired,

    scores: React.PropTypes.shape({
      desktop: React.PropTypes.string.isRequired,
      mobile: React.PropTypes.string.isRequired,
      social: React.PropTypes.string.isRequired,
      seo: React.PropTypes.string.isRequired,
    }).isRequired,

    fetchedScorecard: React.PropTypes.bool,
    fetchingScorecard: React.PropTypes.bool,

    desktop: React.PropTypes.shape({
      base64Image: React.PropTypes.string.isRequired,
      formattedResults: React.PropTypes.object.isRequired
    }),

    mobile: React.PropTypes.shape({
      base64Image: React.PropTypes.string.isRequired,
      formattedResults: React.PropTypes.object.isRequired,
      title: React.PropTypes.string.isRequired,
      rules: React.PropTypes.shape({
        mustFix: React.PropTypes.array.isRequired,
        shouldFix: React.PropTypes.array.isRequired,
        onTarget: React.PropTypes.array.isRequired
      }).isRequired
    }),

    seo: React.PropTypes.shape({

    }),

    social: React.PropTypes.shape({

    })
  }).isRequired
};

module.exports = Mobile;
