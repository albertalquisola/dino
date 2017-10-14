import React from 'react';
import PropTypes from 'prop-types';

import Headerbar from 'components/lib/headerbar/Headerbar';
import Searchbox from 'components/lib/searchbox/Searchbox';

export default class YourRecs extends React.Component {
  render() {
    return (
      <div className="your-recs">
        <Headerbar />
        <div className="balloons-bg">
          <div className="add-recommendation-prompt">Add a Recommendation</div>
          <Searchbox onSearch={this.props.onSearch} />
        </div>
      </div>
    );
  }
}

YourRecs.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

