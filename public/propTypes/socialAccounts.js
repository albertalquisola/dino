import React from 'react';

module.exports = React.PropTypes.shape({
  connected: React.PropTypes.array.isRequired,
  notConnected: React.PropTypes.array.isRequired,
  noAccount: React.PropTypes.array.isRequired
}).isRequired;