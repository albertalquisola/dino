import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

import Alexa from 'components/scorecard/Alexa';

import ACard from 'components/scorecard/cards/A-card';
import BCard from 'components/scorecard/cards/B-card';
import CCard from 'components/scorecard/cards/C-card';
import DCard from 'components/scorecard/cards/D-card';
import FCard from 'components/scorecard/cards/F-card';

import Map from 'components/scorecard/Map';

import scorecardPropTypes from 'propTypes/scorecard';
import Copyright from 'components/reusable/CopyrightFooter';

class Scores extends React.Component {
  componentDidMount() {
    // TODO: [Albert]
    // probably should move this calculation server side

    // For the gamification score, we want it to always be above 50% (to seem impressive), so we'll use the following
    // formula:
    //
    //   score = 50 + ( 5 * num_social_accounts ) + ( 5 * num_competitors )
    //
    // Where num_competitors has a ceiling of 4 (that is, they don't get more points for adding more than 4 competitors).
    //
    // For num_social_accounts, they get this score regardless of whether or not the company has that account (we're scoring
    // the fact that they've answered the question, not what the answer was)
    const numCompetitors = this.props.scorecard.competitors.length;
    const numSocialConfirmations = this.props.scorecard.social.accounts.connected.length +
                                   this.props.scorecard.social.accounts.noAccount.length;
    const gameCardScore = 50 + (5 * numSocialConfirmations) + (numCompetitors > 4 ? 20 : numCompetitors * 5);

    const thisDom = ReactDOM.findDOMNode(this);

    // Move up by the same number of pixels as the score
    const newTop = 150 - gameCardScore;
    const shieldFillElements = thisDom.getElementsByClassName('shield-fill');
    if (shieldFillElements.length === 1)
      shieldFillElements[0].style.top = `${newTop}px`;
  }

  render() {
    const copyright = <Copyright />;

    // For now, we only support 3/6 account types
    const missingAccount = this.props.scorecard.social.accounts.notConnected.length <= 3 ?
                             null :
                             _.first(this.props.scorecard.social.accounts.notConnected);

    const shieldSubheaderText = missingAccount ? `Add ${missingAccount.friendlyName}` : 'Add Competitor';
    const shieldPrompt1 = missingAccount ? `Does ${this.props.scorecard.domainName} have a` : 'Add a competitor of';
    const shieldPrompt2 = missingAccount ? `${missingAccount.friendlyName} account?` : `${this.props.scorecard.domainName}`;
    const shieldAction = missingAccount ?
                         this.props.showSocialModal :
                         () => { this.context.router.push(`/companies/${this.props.scorecard.companyId}/enter-competitors`); };

    let cards = [];
    let topCards;
    let bottomCards;
    let shieldColor;

    // For the gamification score, we want it to always be above 50% (to seem impressive), so we'll use the following
    // formula:
    //
    //   score = 50 + ( 5 * num_social_accounts ) + ( 5 * num_competitors )
    //
    // Where num_competitors has a ceiling of 4 (that is, they don't get more points for adding more than 4 competitors).
    //
    // For num_social_accounts, they get this score regardless of whether or not the company has that account (we're scoring
    // the fact that they've answered the question, not what the answer was)
    const numCompetitors = this.props.scorecard.competitors.length;
    const numSocialConfirmations = this.props.scorecard.social.accounts.connected.length +
                                   this.props.scorecard.social.accounts.noAccount.length;
    const gameCardScore = 50 + (5 * numSocialConfirmations) + (numCompetitors > 4 ? 20 : numCompetitors * 5);

    // Determine shield color from score (< 70: red, 70 - <90: yellow, 90+: green)
    if (gameCardScore < 70)
      shieldColor = 'red';
    else if (gameCardScore < 90)
      shieldColor = 'orange';
    else
      shieldColor = 'green';

    _.forOwn(this.props.scorecard.scores, (value, category) => {
      let ogScore = this.props.scorecard.scores[category];
      let score = this.props.scorecard.scores[category];
      let title = this.props.scorecard[category].title;
      let subtextTop = this.props.scorecard[category].subtextTop;
      let subtextBottom = this.props.scorecard[category].subtextBottom;

      score = score[0].toLowerCase();

      switch (score) {
        case 'a':
          cards.push(<ACard requestId={this.props.requestId}
                            key={category}
                            category={category}
                            score={ogScore}
                            title={title}
                            subtextTop={subtextTop}
                            subtextBottom={subtextBottom} />);
          break;

        case 'b':
          cards.push(<BCard requestId={this.props.requestId}
                            key={category}
                            category={category}
                            score={ogScore}
                            title={title}
                            subtextTop={subtextTop}
                            subtextBottom={subtextBottom} />);
          break;

        case 'c':
          cards.push(<CCard requestId={this.props.requestId}
                            key={category}
                            category={category}
                            score={ogScore}
                            title={title}
                            subtextTop={subtextTop}
                            subtextBottom={subtextBottom} />);
          break;

        case 'd':
          cards.push(<DCard requestId={this.props.requestId}
                            key={category}
                            category={category}
                            score={ogScore}
                            title={title}
                            subtextTop={subtextTop}
                            subtextBottom={subtextBottom} />);
          break;

        case 'f':
          cards.push(<FCard requestId={this.props.requestId}
                            key={category}
                            category={category}
                            score={ogScore}
                            title={title}
                            subtextTop={subtextTop}
                            subtextBottom={subtextBottom} />);
          break;

        case '-':
          cards.push(<FCard requestId={this.props.requestId}
                            key={category}
                            category={category}
                            score={ogScore}
                            title={title}
                            subtextTop={subtextTop}
                            subtextBottom={subtextBottom} />);
          break;

        default:
          throw new Error('saw a score we didn\'t know!');
      }
    });

    cards = _.chunk(cards, 2);
    topCards = cards[0];
    bottomCards = cards[1];

    return (
      <div className="scorecard">
        <div className="top-row">
          <div className="game-card-container">
            <div className="shield-color"></div>
              <div className={`shield-fill ${shieldColor}-fill`}></div>
            <div className="game-card">

              <div className="text-container">
                <div className="game-card-header">
                  <div className="first-section">This Profile is Incomplete</div>
                </div>
                <div className="game-card-score">
                  <div className="first-section">{`${gameCardScore}%`}</div>
                </div>
                <div className="game-card-subheader">
                  <div className="first-section">{`${shieldSubheaderText}`}</div>
                </div>

                <div className="game-card-text">
                  <div className="first-section">{`${shieldPrompt1}`}</div>
                  <div className="second-section">{`${shieldPrompt2}`}</div>
                </div>

                <div className="btn btn-info game-card-btn" onClick={shieldAction}>Complete</div>
              </div>
            </div>
          </div>
        </div>

        <Alexa alexa={this.props.scorecard.alexa} />

        <div className="scorecards">
          <div className="top-row">
            {topCards}
          </div>
          <div className="bottom-row">
            {bottomCards}
          </div>
        </div>

        <Map alexa={this.props.scorecard.alexa} />

        <div className="copyright-container">
          {copyright}
        </div>
      </div>
    );
  }
}

Scores.contextTypes = {
  router: React.PropTypes.object.isRequired
};

Scores.propTypes = _.extend({}, scorecardPropTypes, {
  resetAnalyzer: React.PropTypes.func.isRequired,
  requestId: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]).isRequired,
  showSocialModal: React.PropTypes.func.isRequired
});

module.exports = Scores;
