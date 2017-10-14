import _ from 'lodash';
import React from 'react';
import config from 'config';

import scorecardPropTypes from 'propTypes/scorecard';

import Desktop from 'components/scorecard/details/Desktop';
import Mobile from 'components/scorecard/details/Mobile';
import Social from 'components/scorecard/details/Social';
import Seo from 'components/scorecard/details/Seo';

import Headerbar from 'containers/Headerbar';
import Navbar from 'components/reusable/Navbar';

class Details extends React.Component {
  componentWillMount() {
    if (_.isEmpty(this.props.scorecard))
      this.props.fetchScorecard(this.props.params.requestId);
  }

  render() {
    const headerbar = <Headerbar />;
    const navbar = (
      <Navbar requestId={this.props.params.requestId}
                        companyId={this.props.scorecard.companyId}
                        domainName={this.props.scorecard.domainName} />
    );

    let desktop;
    let social;
    let mobile;
    let seo;
    let gradeColor;

    if (!_.isEmpty(this.props.scorecard)) {
      if (this.props.params.category === config.categories.desktop) {
        gradeColor = this.props.calculateGradeColor(this.props.scorecard.scores.desktop);
        desktop = (<Desktop scorecard={this.props.scorecard}
                            category={this.props.params.category}
                            grade={this.props.scorecard.scores.desktop}
                            gradeColor={gradeColor} />);

      } else if (this.props.params.category === config.categories.social) {
        gradeColor = this.props.calculateGradeColor(this.props.scorecard.scores.social);
        social = (<Social scorecard={this.props.scorecard}
                          category={this.props.params.category}
                          grade={this.props.scorecard.scores.social}
                          gradeColor={gradeColor}
                          hasNoAccount={this.props.hasNoAccount}
                          requestId={this.props.params.requestId}
                          showSocialModal={this.props.showSocialModal} />);

      } else if (this.props.params.category === config.categories.mobile) {
        gradeColor = this.props.calculateGradeColor(this.props.scorecard.scores.mobile);
        mobile = (<Mobile scorecard={this.props.scorecard}
                          category={this.props.params.category}
                          grade={this.props.scorecard.scores.mobile}
                          gradeColor={gradeColor} />);

      } else if (this.props.params.category === config.categories.seo) {
        gradeColor = this.props.calculateGradeColor(this.props.scorecard.scores.seo);
        seo = (<Seo scorecard={this.props.scorecard}
                    category={this.props.params.category}
                    grade={this.props.scorecard.scores.seo}
                    gradeColor={gradeColor} />);
      }
    }

    return (
      <div className="details">
        {headerbar}
        {navbar}
        {desktop}
        {social}
        {mobile}
        {seo}
      </div>
    );
  }
}

Details.propTypes = _.extend({}, scorecardPropTypes, {
  fetchScorecard: React.PropTypes.func.isRequired,
  calculateGradeColor: React.PropTypes.func.isRequired,
  hasNoAccount: React.PropTypes.func.isRequired,
  showSocialModal: React.PropTypes.func.isRequired,

  params: React.PropTypes.shape({
  requestId: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
    category: React.PropTypes.string.isRequired,
  }).isRequired,
});

module.exports = Details;