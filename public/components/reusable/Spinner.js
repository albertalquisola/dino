import React from 'react';
import Spinkit from 'react-spinkit';

class Spinner extends React.Component {
  render() {
    let text;

    if (this.props.text) {
      text = (
        <div className="text-container">
          <span className="text">{this.props.text}</span>
        </div>
      );
    }

    return (
      <div className="spinner-container">
        {text}
        <Spinkit spinnerName="three-bounce" />
      </div>
    );
  }
}

Spinner.propTypes = {
  text: React.PropTypes.string,
};

module.exports = Spinner;