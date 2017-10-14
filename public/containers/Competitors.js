import { connect } from 'react-redux';
import actions from 'actions';

import Competitors from 'components/competitors/Competitors';

const mapStateToProps = (state) => {
  return {
    ...state.company,
    ...state.competitors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetCompetitorReport: () => {
      return dispatch(actions.competitors.resetCompetitorReport());
    },

    getCompany: (companyId) => {
      return dispatch(actions.company.getCompany(companyId));
    },

    postCompetitorReport: (options) => {
      return dispatch(actions.competitors.postCompetitorReport(options));
    },

    noCompetitorsSelected: () => {
      return dispatch(actions.competitors.noCompetitorsSelected());
    },

    showCompetitorModal: () => {
      return dispatch(actions.addCompetitor.showCompetitorModal());
    },
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Competitors);