import { connect } from 'react-redux';
import actions from 'actions';

import AddSocialModal from 'components/modals/AddSocialModal';

const mapStateToProps = (state) => {
  return {
    socialAccounts: state.socialAccounts,
    addSocialAccount: state.addSocialAccount,
    accountToShow: state.addSocialAccount.accountToShow,
    open: state.addSocialAccount.showSocialModal
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSocialAccounts: (companyId) => {
      const options = { companyId };

      return dispatch(actions.socialAccounts.fetchSocialAccounts(options));
    },

    addAnotherAccount: () => {
      return dispatch(actions.addSocialAccount.addAnotherAccount());
    },

    hideSocialModal: () => {
      return dispatch(actions.addSocialAccount.hideSocialModal());
    },

    backToNoAccount: () => {
      return dispatch(actions.addSocialAccount.backToNoAccount());
    },

    fetchAccountDetails: (accountName, accountId) => {
      const options = { accountName, accountId };

      return dispatch(actions.addSocialAccount.fetchAccountDetails(options));
    },

    doesHaveAccount: (account) => {
      const options = { account };

      return dispatch(actions.addSocialAccount.hasAccount(options));
    },

    updateAccount: (options) => {
      return dispatch(actions.addSocialAccount.updateAccount(options));
    }
  };
};

const AddSocialModalContainer = connect(mapStateToProps, mapDispatchToProps)(AddSocialModal);

module.exports = AddSocialModalContainer;