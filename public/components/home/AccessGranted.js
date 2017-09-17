import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';

import Headerbar from 'components/reusable/Headerbar';

class AccessGranted extends React.Component {
  gatherIcons() {
    const icons = [];
    const imgLinks = [
      {
        klassName: 'agency-health-check-link',
        name: 'agency health check',
        link: 'H_icon.png'
      },
      {
        klassName: 'budgeting-and-planning-link',
        name: 'budgeting and planning',
        link: 'B_icon.png'
      },
      {
        klassName: 'reporting-and-analytics-link',
        name: 'reporting and analytics',
        link: 'R_icon.png'
      }
    ];

    icons.push(
        <div key="client-assessment" className="client-assessment-link icon">
          <Link to="/analyze" onClick={this.props.onClickEnter}>
            <div className="icon-container">
              <img src="/public/images/A_icon.png" alt="client assessment" />
            </div>
          </Link>

          <div className="icon-title active">
            client assessment tool
          </div>
        </div>
    );

    _.each(imgLinks, (imgLink) => {
      icons.push(
        <div key={imgLink.klassName} className={`${imgLink.klassName} icon`}>
          <img src={`/public/images/${imgLink.link}`} alt={imgLink.name} />
          <div className="icon-title inactive">
            {imgLink.name}
          </div>
        </div>
      );
    });

    return icons;
  }

  render() {
    const welcomeText = this.props.newUser ? 'Welcome' : 'Welcome back';
    const icons = this.gatherIcons();

    return (
      <div className="access-granted-container">
      <Headerbar />
        <div className="access-granted">
          <div className="agency-name">{this.props.agencyName}</div>

          <div className="message-text">
            <div className="welcome-text">{welcomeText}</div>
            <div className="name-box">
              <div className="name-endcap left"></div>
              <div className="name tk-bookmania">
                {this.props.firstName}
              </div>
              <div className="name-endcap right"></div>
            </div>

            <div className="bars">
              <img className="top-bar name-bar" src="/public/images/bar_2.png" alt="bar" />
              <img className="bottom-bar name-bar" src="/public/images/bar_2.png" alt="bar" />
            </div>
          </div>

          <div className="icons-container">
            {icons}
          </div>
        </div>
      </div>
    );
  }
}

AccessGranted.propTypes = {
  newUser: React.PropTypes.number,
  agencyName: React.PropTypes.string.isRequired,
  onClickEnter: React.PropTypes.func.isRequired,
  firstName: React.PropTypes.string.isRequired
};

module.exports = AccessGranted;
