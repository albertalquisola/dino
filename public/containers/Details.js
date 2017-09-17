import { connect } from 'react-redux';
import actions from 'actions';

import config from 'config';
import Details from 'components/scorecard/details/Details';

const mapStateToProps = (state) => {
  return {
    scorecard: state.scorecard,
    socialAccounts: state.socialAccounts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchScorecard: (requestId) => {
      const options = {};
      options.requestId = requestId;

      return dispatch(actions.scorecard.fetchScorecard(options));
    },

    showSocialModal: (account) => {
      return dispatch(actions.addSocialAccount.showSocialModal(account));
    },

    hasNoAccount: (options) => {
      return dispatch(actions.addSocialAccount.updateAccount(options));
    },

    calculateGradeColor: (grade) => {
      if (typeof grade !== 'string')
        throw new Error('grade should be a string!');

      const letterGrade = grade[0].toLowerCase();

      let gradeColor;

      switch (letterGrade) {
        case 'a':
          gradeColor = config.aColor;
          break;

        case 'b':
          gradeColor = config.bColor;
          break;

        case 'c':
          gradeColor = config.cColor;
          break;

        case 'd':
          gradeColor = config.dColor;
          break;

        case 'f':
          gradeColor = config.fColor;
          break;

        case '-':
          gradeColor = config.fColor;
          break;

        default:
          throw new Error('saw a grade we didnt recognize!');
      }

      return gradeColor;
    }
  };
};

const DetailsContainer = connect(mapStateToProps, mapDispatchToProps)(Details);

module.exports = DetailsContainer;