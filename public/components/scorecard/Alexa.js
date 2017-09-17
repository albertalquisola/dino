import React from 'react';
import Tooltip from 'rc-tooltip';

import alexaPropTypes from 'propTypes/alexa';

class Alexa extends React.Component {
  render() {
    const questionMark = (
      <Tooltip placement="bottom"
               overlay={<span style={{ height: 50, width: 50 }}>i am a tooltip</span>}
               destroyTooltipOnHide={true}
               defaultVisible={true}>
        <i className="fa fa-question-circle"></i>

      </Tooltip>
    );
    let topCountryName;
    let topCountryRank;
    let countryQuestionMark;
    let globalRank;

    if (this.props.alexa) {
      globalRank = this.props.alexa.rank ? this.props.alexa.rank : 'N/A';

      if (this.props.alexa.topCountry) {
        topCountryName = `${this.props.alexa.topCountry.countryName} Rank:`;
        countryQuestionMark = <i className="fa fa-question-circle"></i>;
        topCountryRank = this.props.alexa.topCountry.rank;
      }
    }

    return (
      <div className="alexa-container">
        <img alt="left bar" src="/public/images/endcap_alexa100px.png" className="left-bar bar" />

        <div className="horizontal-rows-container">
          <div className="top-row"></div>

          <div className="data-container">
            <div className="global-rank-container">
              <span className="global-rank-text">Global Rank:</span>
              <i className="fa fa-question-circle"></i>
              <span className="global-rank">{globalRank}</span>
            </div>
            <div className="top-country-container">
              <span className="top-country-name">{topCountryName}</span>
              {countryQuestionMark}
              <span className="top-country-rank">{topCountryRank}</span>
            </div>
          </div>

          <div className="bottom-row"></div>
        </div>

        <img alt="right bar" src="/public/images/endcap_alexa100px.png" className="right-bar bar " />
      </div>
    );
  }
}

Alexa.propTypes = alexaPropTypes.isRequired;

module.exports = Alexa;
