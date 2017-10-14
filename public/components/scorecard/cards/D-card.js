import React from 'react';
import { Link } from 'react-router';

class DCard extends React.Component {
  render() {
    const linkUrl = `/scorecards/${this.props.requestId}/${this.props.category}`;

    return (
      <Link className="scorecard-link" to={linkUrl}>
        <div className="card-border">
          <div className="arrow-ends"></div>

          <div className="d-card card">
            <div className="d-compass-container compass-container">
              <div className="compass d-compass"></div>
              <div className="category">{this.props.category}</div>
            </div>

            <div className="letter-grade d-grade-color">
              {this.props.score}
            </div>

            <div className="bottom-text-container">
              <div className="score-text-title d-grade-color">
                {this.props.title}
              </div>

              <div className="score-text-top">
                {this.props.subtextTop}
              </div>

              <div className="score-text-bottom">
                {this.props.subtextBottom}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

DCard.propTypes = {
  category: React.PropTypes.string.isRequired,
  score: React.PropTypes.string.isRequired,
  requestId: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  title: React.PropTypes.string.isRequired,
  subtextTop: React.PropTypes.string.isRequired,
  subtextBottom: React.PropTypes.string.isRequired,
};

module.exports = DCard;