import _ from 'lodash';
import React from 'react';
import Checkbox from 'components/reusable/Checkbox';

import Headerbar from 'containers/Headerbar';
import Navbar from 'components/reusable/Navbar';
import AddCompetitorModal from 'containers/AddCompetitorModal';

class Competitors extends React.Component {
  componentWillMount() {
    this.props.resetCompetitorReport();
    this.props.getCompany(this.props.params.companyId);

    this.selectedCheckboxes = new Set();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.postedCompetitorReport)
      this.context.router.push(`/competitor-reports/${nextProps.reportId}`);
  }

  trackCheckbox() {
    return (checkbox) => {
      this.selectedCheckboxes.add(checkbox);
    };
  }

  checkAction() {
    return () => {
      // Determine how many checkboxes are selected
      let countSelected = 0;

      this.selectedCheckboxes.forEach((checkbox) => {
        if (checkbox.state.checked)
          countSelected++;
      });

      // If no checkboxes are selected, disable the 'compare' button
      const compareButton = _.first(document.getElementsByClassName('compare'));

      if (countSelected === 0)
        compareButton.classList.add('disabled');
      else
        compareButton.classList.remove('disabled');
    };
  }

  grabSelectedCompetitors() {
    const selectedCompetitors = [];

    this.selectedCheckboxes.forEach((checkbox) => {
      if (checkbox.state.checked)
        selectedCompetitors.push(checkbox.state);
    });

    return selectedCompetitors;
  }

  postCompetitorReport() {
    return () => {
      const competitors = this.grabSelectedCompetitors();
      const companyId = this.props.params.companyId;

      const options = { competitors, companyId };

      competitors.length ?
        this.props.postCompetitorReport(options) :
        this.props.noCompetitorsSelected();
    };
  }

  render() {
    const competitors = [];
    const navbar = (<Navbar requestId={this.props.requestId}
                  companyId={this.props.companyId}
                  domainName={this.props.domainName} />);

    if (this.props.fetchedCompany) {
      _.each(this.props.competitors, (competitor, index) => {
        competitors.push(
          <div key={index} className="competitor">
            <Checkbox competitorId={competitor.company_competitor_id}
                      name={competitor.domain}
                      trackCheckbox={this.trackCheckbox()}
                      checkAction={this.checkAction()} />
          </div>
        );
      });
    }

    return (
      <div>
        <Headerbar />
        {navbar}

        <div className="enter-competitors">
          <div className="page-title">
            Competitor Report
          </div>

          <div className="enter-competitors-box">
            <div className="prompt tk-bookmania">
              Choose up to 4 competitors to compare:
            </div>

            <div className="competitors">
              {competitors}
              <div className="add-competitor-container">
                <span className="add-competitor tk-bookmania" onClick={this.props.showCompetitorModal}>
                  Add a competitor
                </span>
              </div>
            </div>


            <button className="compare btn btn-primary disabled" onClick={this.postCompetitorReport()}>Compare</button>
          </div>
        </div>

        <AddCompetitorModal companyId={this.props.params.companyId} />
      </div>
    );
  }
}

Competitors.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

Competitors.propTypes = {
  fetchedCompany: React.PropTypes.bool,
  fetchingCompany: React.PropTypes.bool,
  fetchedCompetitors: React.PropTypes.bool,
  fetchingCompetitors: React.PropTypes.bool,

  companyId: React.PropTypes.number,
  requestId: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  domainName: React.PropTypes.string,
  competitors: React.PropTypes.array,

  getCompany: React.PropTypes.func.isRequired,
  showCompetitorModal: React.PropTypes.func.isRequired,
  resetCompetitorReport: React.PropTypes.func.isRequired,
  postCompetitorReport: React.PropTypes.func.isRequired,
  noCompetitorsSelected: React.PropTypes.func.isRequired,

  params: React.PropTypes.shape({
    companyId: React.PropTypes.string.isRequired,
  }).isRequired,
};

module.exports = Competitors;
