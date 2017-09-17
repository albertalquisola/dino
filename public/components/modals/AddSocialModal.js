import _ from 'lodash';
import React from 'react';
import Modal from 'react-bootstrap-modal';

import config from 'config';

import socialAccountsPropTypes from 'propTypes/socialAccounts';

class AddSocialModal extends React.Component {
  componentWillMount() {
    if (_.isEmpty(this.props.socialAccounts))
      this.props.fetchSocialAccounts(this.props.companyId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addSocialAccount.updatedAccount && nextProps.accountToShow)
      this.props.hideSocialModal();
  }

  addAnotherAccount() {
    return (event) => {
      event.preventDefault();

      this.props.addAnotherAccount();
    };
  }

  backToNoAccount() {
    return (event) => {
      event.preventDefault();

      this.props.backToNoAccount();
    };
  }

  doesNotHaveAccount(account) {
    return (event) => {
      event.preventDefault();

      const options = {
        accountName: account.name,
        companyId: this.props.companyId,
        accountId: ''
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
        accountId: this.props.addSocialAccount.accountDetails.accountId,
        accountName: account.name,
        companyId: this.props.companyId,
      };

      if (this.props.requestId)
        options.requestId = this.props.requestId;

      this.props.updateAccount(options);
    };
  }

  render() {
    const companyName = this.props.domainName;
    const fetchedAccounts = this.props.socialAccounts.fetchedAccounts;

    let allAccountsAdded = false;
    let notConnectedAccounts;
    let missingAccount;
    let accountName;

    let modalBody;
    let modalFooter;

    if (fetchedAccounts && this.props.socialAccounts.notConnected.length) {
      notConnectedAccounts = this.props.socialAccounts.notConnected;

      // HACK [Albert]
      // right now, we dont have implementations for linkedin and instagram
      // so pluck those out of the missing accounts array since we dont yet have connections built
      _.remove(notConnectedAccounts, (account) => {
        return account.name === config.accounts.linkedin || account.name === config.accounts.instagram;
      });

      missingAccount = _.first(notConnectedAccounts);

      if (missingAccount)
        accountName = missingAccount.friendlyName;
    }

    // override account if specific account is specified
    if (fetchedAccounts && this.props.accountToShow) {
      missingAccount = _.find(notConnectedAccounts, (account) => {
        return account.name === this.props.accountToShow;
      });
      accountName = missingAccount.friendlyName;
    }

    if (fetchedAccounts && !this.props.socialAccounts.notConnected.length) {
      allAccountsAdded = true;
    }

    if (allAccountsAdded) {
      modalBody = <div className="all-added">All social media accounts added!</div>;

    } else if (this.props.addSocialAccount.updatedAccount) {
      modalBody = (
        <div className="add-another-account">
          <div className="title">Would you like to add another social account?</div>
          <div className="yes-no-btns">
            <button className="btn btn-info no-btn" onClick={this.props.hideSocialModal}>no</button>
            <button className="btn btn-primary yes-btn" onClick={this.addAnotherAccount()}>yes</button>
          </div>
        </div>
      );
    } else if (!this.props.addSocialAccount.hasAccount &&
               !this.props.addSocialAccount.fetchedAccountDetails &&
               !this.props.addSocialAccount.noAccountFound) {

      modalBody = (
        <div className="does-account-exist">
          <div className="add-account-title">Add a social media account</div>
          <div className="missing-account-prompt tk-bookmania">
            Does {companyName} have a {accountName} account?
          </div>
          <div className="yes-no-btns">
            <button className="btn btn-info no-btn" onClick={this.doesNotHaveAccount(missingAccount)}>no</button>
            <button className="btn btn-primary yes-btn" onClick={this.hasAccount(missingAccount)}>yes</button>
          </div>
        </div>
      );

    } else if (this.props.addSocialAccount.hasAccount &&
              !this.props.addSocialAccount.fetchedAccountDetails &&
              !this.props.addSocialAccount.noAccountFound &&
              !this.props.addSocialAccount.invalidAccountId) {
      modalBody = (
        <div className="add-account">
          <div className="prompt">Add {companyName}'s {accountName} account name below</div>
          <form className="add-account-form" onSubmit={this.fetchAccountDetails(missingAccount.name)}>
            <input type="text" name="social-account" className="social-account" />
            <span className="input-bar"></span>
            <div>
              <button className="btn btn-info no-btn" onClick={this.backToNoAccount()}>Back</button>
              <button className="btn btn-primary yes-btn" type="submit">Next</button>
            </div>
          </form>
        </div>
      );

    } else if (this.props.addSocialAccount.invalidAccountId) {
      modalBody = (
        <div className="invalid-account-id">
          <div className="invalid-prompt">
            I'm sorry, you've entered an invalid account ID. Please try again.
          </div>
          <div className="prompt">Add {companyName}'s {accountName} account name below</div>
          <form className="add-account-form" onSubmit={this.fetchAccountDetails(missingAccount.name)}>
            <input type="text" name="social-account" className="social-account" />
            <span className="input-bar"></span>
            <button className="btn btn-info no-btn" onClick={this.backToNoAccount()}>Back</button>
            <button className="btn btn-primary yes-btn" type="submit">Next</button>
          </form>
        </div>
      );

    } else if (this.props.addSocialAccount.noAccountFound) {
      modalBody = (
        <div className="error-no-account">
          <div className="error-prompt">
            I'm sorry, we weren't able to find an account with that name.
          </div>
          <div className="error-prompt-two">
            Please try again.
          </div>
          <form className="add-account-form" onSubmit={this.fetchAccountDetails(missingAccount.name)}>
            <input type="text" name="social-account" className="social-account" />
            <span className="input-bar"></span>
            <button className="btn btn-info no-btn" onClick={this.backToNoAccount()}>Back</button>
            <button className="btn btn-primary yes-btn" type="submit">Next</button>
          </form>
        </div>
      );

    } else if (this.props.addSocialAccount.hasAccount &&
               this.props.addSocialAccount.fetchedAccountDetails) {
      modalBody = (
        <div className="verify">
          {`Confirm that this is ${companyName}'s ${accountName} account`}
            <div className="profile-picture">
              <img alt="logo" src={this.props.addSocialAccount.accountDetails.image} />
            </div>

            <button className="btn btn-info no-btn" onClick={this.hasAccount(missingAccount)}>no</button>
            <button className="btn btn-primary yes-btn" onClick={this.addAccount(missingAccount)}>yes</button>
        </div>
      );
    }

    return (
      <Modal show={this.props.open}
             onHide={this.props.hideSocialModal}
             className="add-social-modal">

        <Modal.Header closeButton>
        </Modal.Header>

        <Modal.Body>
          {modalBody}
        </Modal.Body>

        <Modal.Footer>
          {modalFooter}
        </Modal.Footer>

      </Modal>
    );
  }
}

AddSocialModal.propTypes = _.extend({}, socialAccountsPropTypes, {
  addSocialAccount: React.PropTypes.shape({
    account: React.PropTypes.object,
    fetchedAccountDetails: React.PropTypes.bool,
    hasAccount: React.PropTypes.bool,
    noAccountFound: React.PropTypes.bool,
    showSocialModal: React.PropTypes.bool
  }).isRequired,

  open: React.PropTypes.bool,
  hideSocialModal: React.PropTypes.func.isRequired,
  fetchAccountDetails: React.PropTypes.func.isRequired,
  doesHaveAccount: React.PropTypes.func.isRequired,
  updateAccount: React.PropTypes.func.isRequired,
  companyId: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  domainName: React.PropTypes.string.isRequired,
  requestId: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
});

module.exports = AddSocialModal;