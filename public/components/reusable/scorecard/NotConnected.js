import React from 'react';

class NotConnected extends React.Component {
  hasNoAccount() {
    return (event) => {
      event.preventDefault();

      const options = {
        accountName: this.props.name,
        companyId: this.props.companyId,
        requestId: this.props.requestId,
        accountId: ''
      };

      this.props.hasNoAccount(options);
    };
  }

  showSocialModal() {
    return (event) => {
      event.preventDefault();

      this.props.showSocialModal(this.props.name);
    };
  }

  render() {
    if (this.props.friendlyName === 'LinkedIn' ||
        this.props.friendlyName === 'Instagram' ||
        this.props.friendlyName === 'Pinterest') {

      return (
        <div className="not-connected-container">
          <div className={`social-logo ${this.props.name} not-connected`}></div>
          <div className={`not-connected ${this.props.name}`}></div>
          <div className="title">{this.props.friendlyName} is not connected</div>
          <div className="bar"></div>
          <div>Coming soon</div>
        </div>
      );
    }

    return (
      <div className="not-connected-container">
        <div className={`social-logo ${this.props.name} not-connected`}></div>
        <div className={`not-connected ${this.props.name}`}></div>
        <div className="title">{this.props.friendlyName} is not connected</div>
        <div className="bar"></div>

        <div className="yes-no-box">
          <div className="small-bullets gray-bullet"></div>

          <div className="wrapper">
            <div className="prompt-text tk-bookmania">
              <div>Does {this.props.domainName} have a <b>{this.props.friendlyName}</b> account?</div>
              <div className="selection-btns">
                <button className="btn btn-info no-btn" onClick={this.hasNoAccount()}>No</button>
                <button className="btn btn-primary yes-btn" onClick={this.showSocialModal()}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NotConnected.propTypes = {
  hasNoAccount: React.PropTypes.func.isRequired,
  showSocialModal: React.PropTypes.func.isRequired,
  friendlyName: React.PropTypes.string.isRequired,
  domainName: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  requestId: React.PropTypes.string.isRequired,
  companyId: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

module.exports = NotConnected;
