import { connect } from 'react-redux';
import Home from 'components/home/Home';

const mapStateToProps = (state) => {
  return {
    showLoginModal: state.loginModal.showLoginModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

module.exports = HomeContainer;
