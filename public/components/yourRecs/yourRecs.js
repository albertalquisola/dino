import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { saveSearch } from 'actions/search';

import Headerbar from 'components/lib/headerbar/Headerbar';
import Searchbox from 'components/lib/searchbox/Searchbox';
import RecommendationCard from 'components/lib/recommendationCard/RecommendationCard';

class YourRecs extends React.Component {
  render() {
    const recommendations = _.map(this.props.recommendations, (rec) => <RecommendationCard key={rec.place_id} rec={rec} />);

    return (
      <div className="your-recs">
        <Headerbar />
        <div className="balloons-bg">
          <div className="add-recommendation-prompt">Add a Recommendation</div>
          <Searchbox onSearch={this.props.onSearch} />
        </div>
        <div className="recommendations-container">
          {recommendations}
        </div>
      </div>
    );
  }
}

YourRecs.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    recommendations: state.recommendations.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (place, status) => { dispatch(saveSearch(place, status)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YourRecs);
