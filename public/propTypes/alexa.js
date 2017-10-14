import React from 'react';

module.exports = React.PropTypes.shape({
  rank: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
  topCountry: React.PropTypes.shape({
    contributionPageviews: React.PropTypes.number.isRequired,
    contributionUsers: React.PropTypes.number.isRequired,
    countryCode: React.PropTypes.string.isRequired,
    rank: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]).isRequired,
  }),
  countries: React.PropTypes.array.isRequired,
});