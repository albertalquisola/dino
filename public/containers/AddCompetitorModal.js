import { connect } from 'react-redux';
import actions from 'actions';

import AddCompetitorModal from 'components/modals/AddCompetitorModal';

const mapStateToProps = (state) => {
  return {
    open: state.addCompetitor.showCompetitorModal,
    competitor: state.addCompetitor
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCompetitorStats: (options) => {
      return dispatch(actions.addCompetitor.addCompetitorStats(options));
    },

    addCompetitor: (options) => {
      return dispatch(actions.addCompetitor.addCompetitor(options));
    },

    resetCompetitor: () => {
      return dispatch(actions.addCompetitor.resetCompetitor());
    },

    hideCompetitorModal: () => {
      return dispatch(actions.addCompetitor.hideCompetitorModal());
    }
  };
};

const AddCompetitorModalContainer = connect(mapStateToProps, mapDispatchToProps)(AddCompetitorModal);

module.exports = AddCompetitorModalContainer;