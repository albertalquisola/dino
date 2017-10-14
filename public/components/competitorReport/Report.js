import _ from 'lodash';
import React from 'react';

import Headerbar from 'containers/Headerbar';
import Navbar from 'components/reusable/Navbar';
import CompanyColumn from 'components/competitorReport/CompanyColumn';
import CategoryList from 'components/competitorReport/CategoryList';
import Copyright from 'components/reusable/CopyrightFooter';

class CompetitorReport extends React.Component {
  componentWillMount() {
    this.props.getCompetitorReport(this.props.params.competitorReportId);
  }

  getCompetitorColumns(competitors) {
    const columns = [];

    _.each(competitors, (competitor, index) => {
      columns.push(<CompanyColumn key={index} company={competitor} />);
    });

    return columns;
  }

  render() {
    const copyright = <Copyright />;
    let navbar = (<Navbar />);

    let spinner;
    let report;
    let mainCompanyColumn;
    let competitorColumns;
    let categoryList;

    if (this.props.competitorReport.fetchingCompetitorReport) {
      spinner = <div className="spinner"></div>;

    } else if (!this.props.competitorReport.fetchingCompetitorReport &&
               !(_.isEmpty(this.props.competitorReport))) {

      navbar = (<Navbar requestId={this.props.competitorReport.company.requestId}
                        companyId={this.props.competitorReport.company.companyId}
                        domainName={this.props.competitorReport.company.domainName} />);

      categoryList = <CategoryList company={this.props.competitorReport.company} />;
      mainCompanyColumn = <CompanyColumn key="main" isMain={true} company={this.props.competitorReport.company} />;
      competitorColumns = this.getCompetitorColumns(this.props.competitorReport.competitors);

      competitorColumns.unshift(mainCompanyColumn);

      report = (
      <div className="report">
        <Headerbar />
        {navbar}

        <div className="competitor-report">
          <h1>Competitor Report</h1>
          <div className="data-container">
            {categoryList}
            <div className="columns">
              {competitorColumns}
            </div>
          </div>
        </div>
        <div className="copyright-container">
          {copyright}
        </div>
      </div>
      );
    }

    return (
      <div>
        {spinner}
        {report}
      </div>
    );
  }
}

CompetitorReport.propTypes = {
  competitorReport: React.PropTypes.shape({
    fetchingCompetitorReport: React.PropTypes.bool,
    company: React.PropTypes.shape({
      companyId: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
      ]),
      requestId: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
      ]),
      domainName: React.PropTypes.string.isRequired,
    }),
    competitors: React.PropTypes.array,
  }),
  getCompetitorReport: React.PropTypes.func.isRequired,
  params: React.PropTypes.shape({
    competitorReportId: React.PropTypes.string.isRequired,
  }).isRequired,
};

module.exports = CompetitorReport;
