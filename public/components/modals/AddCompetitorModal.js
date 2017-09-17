import _ from 'lodash';
import React from 'react';
import Modal from 'react-bootstrap-modal';
import Spinner from 'react-spinkit';

class AddCompetitorModal extends React.Component {
  addCompetitorStats() {
    return (event) => {
      event.preventDefault();

      const url = _.first(document.getElementsByClassName('competitor-name-input')).value;
      const options = { url };

      this.props.addCompetitorStats(options);
    };
  }

  addCompetitor() {
    return (event) => {
      event.preventDefault();

      const options = {
        companyId: this.props.companyId,
        competitorId: this.props.competitor.companyId
      };

      this.props.addCompetitor(options);
    };
  }

  resetCompetitor() {
    return (event) => {
      event.preventDefault();
      this.props.resetCompetitor();
    };
  }

  render() {
    let modalBody;
    let errorMsg;

    if (this.props.competitor.errorFetchingCompetitor) {
      errorMsg = (<div className="error-msg">Sorry, something went wrong.  Please try again.</div>);
    }

    if (this.props.competitor.fetchingCompetitor) {
      modalBody = (
        <div className="fetching-competitor">
          <div className="title">Fetching Competitor Data</div>
          <Spinner spinnerName="three-bounce" />
        </div>
        );

    } else if (this.props.competitor.fetchedCompetitor) {
      modalBody = (
        <div className="verify">
          <div className="title">confirm that this is</div>
          <div className="competitor-name">{this.props.competitor.domainName}</div>
          <div className="screenshot">
            <img className="laptop" src="/public/images/desktop_image.png" alt="desktop" />
            <img className="laptop-screenshot"
                 src={`data:image/jpeg;base64, ${this.props.competitor.desktop.base64Image}`}
                 alt="desktop screenshot" />
          </div>
          <div className="competitor-buttons">
            <button className="btn btn-info no-btn" onClick={this.resetCompetitor()}>No</button>
            <button className="btn btn-primary yes-btn" onClick={this.addCompetitor()}>Yes</button>
          </div>
        </div>
      );

    } else {
      modalBody = (
        <div className="enter-competitor">
          <div className="prompt">Add a new competitor</div>
          <div className="subprompt tk-bookmania">Type in your competitor's URL below:</div>
          <form className="enter-competitors-form" onSubmit={this.addCompetitorStats()}>
            <input type="text" name="competitor-name" className="competitor-name-input tk-bookmania" />
            <button className="btn btn-primary enter-competitor-btn" type="submit">
              Next
            </button>
          </form>
        </div>
      );
    }

    return (
      <Modal className="add-competitor-modal"
             show={this.props.open}
             onHide={this.props.hideCompetitorModal}>

        <Modal.Header closeButton>
        </Modal.Header>

        {errorMsg}

        <Modal.Body>
          {modalBody}
        </Modal.Body>
      </Modal>
    );
  }
}

AddCompetitorModal.propTypes = {
  open: React.PropTypes.bool,
  hideCompetitorModal: React.PropTypes.func.isRequired,

  competitor: React.PropTypes.shape({
    fetchingCompetitor: React.PropTypes.bool,
    fetchedCompetitor: React.PropTypes.bool,
    addingCompetitor: React.PropTypes.bool,
    addedCompetitor: React.PropTypes.bool,
    errorFetchingCompetitor: React.PropTypes.bool,
    domainName: React.PropTypes.string,
    companyId: React.PropTypes.number,
    desktop: React.PropTypes.shape({
      base64Image: React.PropTypes.string
    })
  }),

  addCompetitorStats: React.PropTypes.func.isRequired,
  addCompetitor: React.PropTypes.func.isRequired,
  resetCompetitor: React.PropTypes.func.isRequired,
  companyId: React.PropTypes.string.isRequired
};

module.exports = AddCompetitorModal;