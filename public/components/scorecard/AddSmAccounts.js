import _ from 'lodash';
import React from 'react';

import scorecardPropTypes from 'propTypes/scorecard';

class AddSmAccounts extends React.Component {
  componentWillMount() {
    if (_.isEmpty(this.props.scorecard))
      this.props.fetchScorecard(this.props.params.requestId);
  }

  doesNotHaveAccount(account) {
    return (event) => {
      event.preventDefault();

      const options = {
        accountName: account.name,
        companyId: this.props.scorecard.companyId,
        requestId: this.props.params.requestId,
        accountId: 0
      };

      this.props.updateAccount(options);
    };
  }

  hasAccount(account) {
    return (event) => {
      event.preventDefault();

      this.props.doesHaveAccount(account);
    };
  }

  fetchAccountDetails(accountName) {
    return (event) => {
      event.preventDefault();

      const accountId = _.first(document.getElementsByClassName('social-account')).value;
      this.props.fetchAccountDetails(accountName, accountId);
    };
  }

  addAccount(account) {
    return (event) => {
      event.preventDefault();

      const options = {
        accountId: this.props.socialAccounts.accountDetails.accountId,
        accountName: account.name,
        companyId: this.props.scorecard.companyId,
        requestId: this.props.params.requestId,
      };

      this.props.updateAccount(options);
    };
  }

  render() {
    let loadingState;
    let doesAccountExist;
    let hasAccountBox;
    let allAccountsAdded;
    let verifyAccount;

    let notConnectedAccounts;
    let missingAccount;
    let accountName;

    if (!(_.isEmpty(this.props.scorecard)) && this.props.scorecard.social.accounts.notConnected.length) {
      notConnectedAccounts = this.props.scorecard.social.accounts.notConnected;
      missingAccount = _.first(notConnectedAccounts);
      accountName = missingAccount.friendlyName;
    }

    if (this.props.scorecard.fetchingScorecard || _.isEmpty(this.props.scorecard)) {
      loadingState = <div className="spinner">loading</div>;

    } else if (!(_.isEmpty(this.props.scorecard)) && !this.props.scorecard.social.accounts.notConnected.length) {
      allAccountsAdded = <div>all accounts added</div>;

    } else if (this.props.socialAccounts.hasAccount && !this.props.socialAccounts.fetchedAccountDetails) {
      hasAccountBox = (
        <div className="add-account">
          <form className="add-account-form" onSubmit={this.fetchAccountDetails(missingAccount.name)}>
            <input type="text" name="social-account" className="social-account" />
            <span className="input-bar"></span>
            <button className="btn btn-primary" type="submit">
              Next
            </button>
          </form>
        </div>
      );

    } else if (this.props.socialAccounts.fetchedAccountDetails) {
      verifyAccount = (
        <div className="verify">
          verify account
        </div>
      );

    } else {
      doesAccountExist = (
        <div className="does-account-exist">
          <div className="missing-account-prompt">
            Do you have a {accountName} account?
          </div>
          <div className="yes-no-btns">
            <button className="btn btn-info" onClick={this.doesNotHaveAccount(missingAccount)}>no</button>
            <button className="btn btn-primary" onClick={this.hasAccount(missingAccount)}>yes</button>
          </div>
        </div>
      );
    }

    return (
      <div className="add-sm-accounts">
        <div className="add-sm-container">
            {loadingState}
            {hasAccountBox}
            {doesAccountExist}
            {allAccountsAdded}
            {verifyAccount}
        </div>
      </div>
    );
  }
}

AddSmAccounts.propTypes = _.extend({}, scorecardPropTypes, {
  fetchScorecard: React.PropTypes.func.isRequired,
  doesHaveAccount: React.PropTypes.func.isRequired,
  updateAccount: React.PropTypes.func.isRequired,
  fetchAccountDetails: React.PropTypes.func.isRequired,

  params: React.PropTypes.shape({
    requestId: React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.number
]).isRequired
  }).isRequired
});

module.exports = AddSmAccounts;