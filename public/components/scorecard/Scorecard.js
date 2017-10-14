import _ from 'lodash';
import React from 'react';

import AddSocialModal from 'containers/AddSocialModal';
import Headerbar from 'containers/Headerbar';
import Navbar from 'components/reusable/Navbar';
import Spinner from 'components/reusable/Spinner';
import Scores from 'components/scorecard/Scores';

import scorecardPropTypes from 'propTypes/scorecard';

class Scorecard extends React.Component {
  componentWillMount() {
    if (_.isEmpty(this.props.scorecard))
      this.props.fetchScorecard(this.props.params.requestId);
  }

  render() {
    const navbar = (<Navbar requestId={this.props.params.requestId}
                            companyId={this.props.scorecard.companyId}
                            domainName={this.props.scorecard.domainName} />);
    let spinner;
    let scores;
    let addSocialModal;

    if (this.props.scorecard.fetchingScorecard || _.isEmpty(this.props.scorecard)) {
      spinner = <Spinner text="fetching data" />;

    } else if (this.props.scorecard) {

      addSocialModal = (<AddSocialModal companyId={this.props.scorecard.companyId}
                                        domainName={this.props.scorecard.domainName}
                                        requestId={this.props.params.requestId} />);

      scores = (<Scores requestId={this.props.params.requestId}
                        scorecard={this.props.scorecard}
                        resetAnalyzer={this.props.resetAnalyzer}
                        showSocialModal={this.props.showSocialModal} />);
    }

    return (
      <div>
        <Headerbar />
        {navbar}
        {spinner}
        {scores}
        {addSocialModal}
      </div>
    );
  }
}

Scorecard.propTypes = _.extend({}, scorecardPropTypes, {
  resetAnalyzer: React.PropTypes.func.isRequired,
  fetchScorecard: React.PropTypes.func.isRequired,
  showSocialModal: React.PropTypes.func.isRequired,

  params: React.PropTypes.shape({
    requestId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]).isRequired,
  }).isRequired,
});

module.exports = Scorecard;