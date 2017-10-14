import React from 'react';

class RuleRow extends React.Component {
  concatText(textArr) {
    const text = [];

    textArr.forEach((item, index) => {
      item.isBold ?
        text.push(<span className="bold" key={index}>{item.text}</span>) :
        text.push(item.text);
    });

    return text;
  }

  render() {
    let text;

    if (this.props.rule && !this.props.ruleArr) {
      text = this.props.rule;

    } else if (this.props.ruleArr && !this.props.rule) {
      text = this.concatText(this.props.ruleArr);

    } else {
      throw new Error('no text provided in RuleRow!');
    }

    return (
      <div className="ruleRow-container">
        <div className={`${this.props.bulletColor} small-bullets`}></div>
        <span className={`${this.props.bulletColor} tk-bookmania`}>{text}</span>
      </div>
    );
  }
}

RuleRow.propTypes = {
  bulletColor: React.PropTypes.string.isRequired,
  rule: React.PropTypes.string,
  ruleArr: React.PropTypes.array,
};

module.exports = RuleRow;