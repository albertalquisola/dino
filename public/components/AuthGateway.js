import React from 'react';
import PropTypes from 'prop-types';

export default class AuthGateway extends React.Component {
  componentWillMount() {
    // boilerplate. add auth gateway check here
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

AuthGateway.propTypes = {
  children: PropTypes.node.isRequired,
};
