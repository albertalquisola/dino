import React from 'react';

import RuleRow from 'components/reusable/scorecard/RuleRow';

class SeoSection extends React.Component {
  render() {
    const metrics = [];

    this.props.metrics.forEach((metric, index) => {
      metrics.push(<RuleRow bulletColor={metric.color}
                            key={index}
                            ruleArr={metric.text}
                   />);
    });

    return (
      <div className="seo-section">
        <div className={`seo-icon ${this.props.sectionName} ${this.props.sectionColor}`}></div>
        <div className="section-name">{this.props.friendlyName}</div>
        <div className="bar"></div>
        {metrics}
      </div>
    );
  }
}

SeoSection.propTypes = {
  metrics: React.PropTypes.array.isRequired,
  sectionName: React.PropTypes.string.isRequired,
  sectionColor: React.PropTypes.string.isRequired,
  friendlyName: React.PropTypes.string.isRequired,
};

module.exports = SeoSection;