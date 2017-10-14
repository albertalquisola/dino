import React from 'react';

import RuleRow from 'components/reusable/scorecard/RuleRow';

class SocialMetrics extends React.Component {
  render() {
    const metrics = [];

    this.props.metrics.forEach((metric, index) => {
      metrics.push(<RuleRow className={metric.className}
                            bulletColor={metric.color}
                            key={index}
                            ruleArr={metric.text}
                   />);
    });

    return (
      <div>
        {metrics}
      </div>
    );
  }
}

SocialMetrics.propTypes = {
  domainName: React.PropTypes.string.isRequired,
  metrics: React.PropTypes.array.isRequired,
};

module.exports = SocialMetrics;