import { connect } from 'react-redux';

import LoginButton from 'components/lib/buttons/login/LoginButton';
import LoginModalActions from 'actions/loginModal';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    showLoginModal: () => dispatch(LoginModalActions.showLoginModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
