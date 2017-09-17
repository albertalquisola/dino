import React from 'react';
import _ from 'lodash';

class MultCompanies extends React.Component {
  render() {
    let companies = _.map(this.props.companies, (company, index) => {
      return (
        <div className="btn btn-black company-box"
          key={index}
          id={company.id}
          name={company.name}
          onClick={this.props.onClickCompany}>
          {company.name}
        </div>
      );
    });

    return (
      <div className="mult-companies">
        <div className="stag-small-container">
          <div className="stag-image-small"></div>
        </div>

        <div className="mult-companies-header">
          On Whose Behalf?
        </div>
        <div className="companies-box">
          {companies}
        </div>
      </div>
    );
  }
}

MultCompanies.propTypes = {
  companies: React.PropTypes.array.isRequired,
  onClickCompany: React.PropTypes.func.isRequired
};

module.exports = MultCompanies;