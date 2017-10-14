import React from 'react';
import PropTypes from 'prop-types';

export default class GoButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} className="btn btn-primary go-button">Go</button>
    );
  }
}

GoButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

