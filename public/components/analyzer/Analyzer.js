import React from 'react';

import LoadingState from 'components/analyzer/LoadingState';
import ViewScorecard from 'components/analyzer/ViewScorecard';
import ClientUrl from 'components/analyzer/ClientUrl';

class Analyzer extends React.Component {
  render() {
    let loadingState;
    let viewScorecard;
    let clientUrl;

    if (this.props.scorecard.error) {
      clientUrl = (<ClientUrl onClickScorecard={this.props.onClickScorecard}
                              error={this.props.scorecard.error} />);

    } else if (this.props.scorecard.calculatingScorecard) {
      loadingState = <LoadingState />;

    } else if (this.props.scorecard.calculatedScorecard) {
      viewScorecard = <ViewScorecard requestId={this.props.scorecard.requestId} />;

    } else {
      clientUrl = <ClientUrl onClickScorecard={this.props.onClickScorecard} />;
    }

    return (
      <div>
        {loadingState}
        {viewScorecard}
        {clientUrl}
      </div>
    );
  }
}

Analyzer.propTypes = {
  onClickScorecard: React.PropTypes.func.isRequired,

  scorecard: React.PropTypes.shape({
    scores: React.PropTypes.object,
    domainName: React.PropTypes.string,
    requestId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    calculatingScorecard: React.PropTypes.bool,
    calculatedScorecard: React.PropTypes.bool,
    error: React.PropTypes.object
  }).isRequired
};

module.exports = Analyzer;