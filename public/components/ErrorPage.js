import React from 'react';

import BackBtn from 'components/reusable/BackBtn';

class ErrorPage extends React.Component {

  render() {
    return (
      <div className="error-page">
        <div className="headerbar">
          <BackBtn />
          <div className="error-image">
            <img src="/public/images/errorpage_v2.png" alt="stag-error" />
          </div>
          <div className="right-panel"></div>
        </div>
        <div className="error-title">Error</div>
        <div className="error-msg">We recommend you go back</div>
      </div>
    );
  }
}

ErrorPage.propTypes = {
  history: React.PropTypes.shape({
    goBack: React.PropTypes.func.isRequired
  }).isRequired
};

module.exports = ErrorPage;