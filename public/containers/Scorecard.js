import { connect } from 'react-redux';
import actions from 'actions';
import Scorecard from 'components/scorecard/Scorecard';

const mapStateToProps = (state) => {
  return {
    scorecard: state.scorecard
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchScorecard: (requestId) => {
      const options = { requestId };

      return dispatch(actions.scorecard.fetchScorecard(options));
    },

    resetAnalyzer: () => {
      return dispatch(actions.scorecard.resetAnalyzer());
    },

    showSocialModal: () => {
      return dispatch(actions.addSocialAccount.showSocialModal());
    }
  };
};

const scorecardContainer = connect(mapStateToProps, mapDispatchToProps)(Scorecard);

module.exports = scorecardContainer;

