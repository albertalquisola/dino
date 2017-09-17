import { connect } from 'react-redux';
import actions from 'actions';

import CompetitorReport from 'components/competitorReport/Report';

const mapStateToProps = (state) => {
  return { competitorReport: state.competitorReport };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompetitorReport: (competitorReportId) => {
      return dispatch(actions.competitorReport.getReport(competitorReportId));
    }
  };
};

const competitorReportContainer = connect(mapStateToProps, mapDispatchToProps)(CompetitorReport);

module.exports = competitorReportContainer;