import React from 'react';
import { Link } from 'react-router';

class Navbar extends React.Component {
  render() {
    let scorecardLink;
    let competitorsLink;

    if (this.props.requestId) {
      scorecardLink = (
        <Link className="scorecard-link" to={`/scorecards/${this.props.requestId}`}>
          <span>Scorecard</span>
        </Link>
      );

    } else {
      scorecardLink = (
        <div className="disabled-scorecard-link">
          <span>Scorecard</span>
        </div>
      );
    }

    if (this.props.companyId) {
      competitorsLink = (
        <Link to={`/companies/${this.props.companyId}/enter-competitors`}>
          <span className="competition-link">Competitors</span>
        </Link>
      );

    } else {
      competitorsLink = (<span className="disabled-competitor-link">Competitors</span>);
    }

    return (
      <nav className="nav-bar">
        <div className="scorecard-link-container">
          {scorecardLink}
        </div>

        <div className="website-box-container">
          <div className="website-box">
            <div className="url-endcap left"></div>
            <div className="website-name tk-bookmania">
              {this.props.domainName}
            </div>
            <div className="url-endcap right"></div>
          </div>

          <div className="bars">
            <img className="top-bar url-bar" src="/public/images/bar_2.png" alt="bar" />
            <img className="bottom-bar url-bar" src="/public/images/bar_2.png" alt="bar" />
          </div>
        </div>

        <span className="links-container">
          {competitorsLink}
          <span className="reporting-link">Reporting</span>
        </span>
      </nav>
    );
  }
}

Navbar.propTypes = {
  requestId: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  companyId: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  domainName: React.PropTypes.string
};

module.exports = Navbar;
