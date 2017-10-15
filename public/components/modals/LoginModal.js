import React from 'react';
import Modal from 'react-bootstrap-modal';
import { connect } from 'react-redux';

import { hideLoginModal } from 'actions/loginModal';
import FacebookLogin from 'components/lib/FacebookLogin';

class LoginModal extends React.Component {
  render() {
    const modalBody = (
      <div className="login-modal-content">
        <FacebookLogin />
      </div>
    );

    return (
      <Modal className="login-modal"
             show={this.props.show}
             onHide={this.props.hideModal}>

        <Modal.Header closeButton>
        </Modal.Header>

        <Modal.Body>
          {modalBody}
        </Modal.Body>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  show: React.PropTypes.bool.isRequired,
  hideModal: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    show: state.loginModal.show,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => dispatch(hideLoginModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
