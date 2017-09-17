import { connect } from 'react-redux';
import actions from 'actions';

import Analyzer from 'components/analyzer/Analyzer';

const mapStateToProps = (state) => {
  return {
    scorecard: state.scorecard
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickScorecard: (event) => {
      event.preventDefault();

      const options = {};
      options.url = document.getElementsByClassName('client-url')[0].value;

      options.url ?
        dispatch(actions.scorecard.calculateScorecard(options)) :
        dispatch(actions.scorecard.invalidUrl(options));
    }
  };
};

const AnalyzeContainer = connect(mapStateToProps, mapDispatchToProps)(Analyzer);

module.exports = AnalyzeContainer;