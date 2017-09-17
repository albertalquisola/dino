import React from 'react';

export default class AuthGateway extends React.Component {
  componentWillMount() {
    // boilerplate. add auth gateway check here
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

AuthGateway.propTypes = {
  children: React.PropTypes.node.isRequired,
};
