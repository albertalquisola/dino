import { connect } from 'react-redux';
import actions from 'actions';

import Headerbar from 'components/reusable/Headerbar';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetAnalyzer: () => {
      return dispatch(actions.scorecard.resetAnalyzer());
    }
  };
};

const HeaderbarContainer = connect(mapStateToProps, mapDispatchToProps)(Headerbar);

module.exports = HeaderbarContainer;