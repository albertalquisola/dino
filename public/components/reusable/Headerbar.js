import React from 'react';
import { Link } from 'react-router';

class Headerbar extends React.Component {
  render() {
    return (
      <div className="headerbar">
        <div className="home-link-container">
          <Link to="/analyze" className="home-link" onClick={this.props.resetAnalyzer}>Home</Link>
        </div>

        <div className="stag-small-container">
          <div className="stag-image-small"></div>
        </div>

        <div className="right-panel">
        </div>
      </div>
    );
  }
}

Headerbar.propTypes = {
  resetAnalyzer: React.PropTypes.func
};

module.exports = Headerbar;
