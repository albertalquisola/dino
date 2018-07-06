import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Headerbar from 'components/lib/headerbar/Headerbar';
import Searchbox from 'components/lib/searchbox/Searchbox';
import RecommendationCard from 'components/lib/recommendationCard/RecommendationCard';

class AddRecs extends React.Component {
  render() {
    const recommendations = _.map(this.props.recommendations, (rec) => <RecommendationCard key={rec.id} rec={rec} />);

    return (
      <div className="add-recs">
        <Headerbar />
        <div className="balloons-bg">
          <div className="add-recommendation-prompt">Add a Recommendation</div>
          <Searchbox />
        </div>
        <div className="recommendations-container">
          {recommendations}
        </div>
      </div>
    );
  }
}

AddRecs.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => {
  return {
    recommendations: state.recommendations.data,
  };
};

export default connect(mapStateToProps)(AddRecs);
