import { connect } from 'react-redux';
import actions from 'actions';

import App from 'components/App';

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => { dispatch(actions.user.fetchUser()); }
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

module.exports = AppContainer;