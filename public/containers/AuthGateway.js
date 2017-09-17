import { connect } from 'react-redux';
import actions from 'actions';

import AuthGateway from 'components/AuthGateway';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AuthGateway);

module.exports = AppContainer;
