import React from 'react';
import Modal from 'react-bootstrap-modal';
import { connect } from 'react-redux';

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
             onHide={() => console.log('need to hide!')}>

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
  hideCompetitorModal: React.PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    show: state.loginModal.show,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
