import React from 'react';
import { Link } from 'react-router';

class ViewScorecard extends React.Component {
  render() {
    return (
      <div className="scorecard-gateway">
        <div className="stag-large-container">
          <div className="stag-image-large"></div>
        </div>

        <Link to={`/scorecards/${this.props.requestId}`}>
          <div className="btn btn-primary view-scorecard-btn">
            Proceed
          </div>
        </Link>
      </div>
    );
  }
}

ViewScorecard.propTypes = {
  requestId: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]).isRequired
};

module.exports = ViewScorecard;