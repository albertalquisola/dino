import React from 'react';

import socialAccountsPropTypes from 'propTypes/socialAccounts';
import alexaPropTypes from 'propTypes/alexa';

module.exports = {
  scorecard: React.PropTypes.shape({
    alexa: alexaPropTypes,
    competitors: React.PropTypes.array,

    scores: React.PropTypes.object,
    domainName: React.PropTypes.string,
    requestId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    companyId: React.PropTypes.number,

    fetchedScorecard: React.PropTypes.bool,
    fetchingScorecard: React.PropTypes.bool,

    desktop: React.PropTypes.shape({
      base64Image: React.PropTypes.string.isRequired,
      formattedResults: React.PropTypes.object.isRequired,
      title: React.PropTypes.string.isRequired,
      score: React.PropTypes.string.isRequired,
      subtextTop: React.PropTypes.string.isRequired,
      subtextBottom: React.PropTypes.string.isRequired,

      rules: React.PropTypes.shape({
        mustFix: React.PropTypes.array.isRequired,
        shouldFix: React.PropTypes.array.isRequired,
        onTarget: React.PropTypes.array.isRequired
      }).isRequired,
    }),

    mobile: React.PropTypes.shape({
      base64Image: React.PropTypes.string.isRequired,
      formattedResults: React.PropTypes.object.isRequired,
      title: React.PropTypes.string.isRequired,
      score: React.PropTypes.string.isRequired,
      subtextTop: React.PropTypes.string.isRequired,
      subtextBottom: React.PropTypes.string.isRequired,

      rules: React.PropTypes.shape({
        mustFix: React.PropTypes.array.isRequired,
        shouldFix: React.PropTypes.array.isRequired,
        onTarget: React.PropTypes.array.isRequired
      }).isRequired,
    }),

    seo: React.PropTypes.shape({
      metrics: React.PropTypes.shape({
        links: React.PropTypes.shape({
          color: React.PropTypes.string.isRequired,
          friendlyName: React.PropTypes.string.isRequired,
          metrics: React.PropTypes.array.isRequired
        }),
        search: React.PropTypes.shape({
          color: React.PropTypes.string.isRequired,
          friendlyName: React.PropTypes.string.isRequired,
          metrics: React.PropTypes.array.isRequired
        }),
        structure: React.PropTypes.shape({
          color: React.PropTypes.string.isRequired,
          friendlyName: React.PropTypes.string.isRequired,
          metrics: React.PropTypes.array.isRequired
        }),
        security: React.PropTypes.shape({
          color: React.PropTypes.string.isRequired,
          friendlyName: React.PropTypes.string.isRequired,
          metrics: React.PropTypes.array.isRequired
        })
      })
    }),

    social: React.PropTypes.shape({
      accounts: socialAccountsPropTypes,
      title: React.PropTypes.string.isRequired,
      score: React.PropTypes.string.isRequired,
      subtextTop: React.PropTypes.string.isRequired,
      subtextBottom: React.PropTypes.string.isRequired
    })
  }).isRequired
};