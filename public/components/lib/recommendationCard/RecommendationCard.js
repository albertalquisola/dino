import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class RecommendationCard extends React.Component {
  render() {
    console.log(this.props.rec);
    return (<div className="recommendation-card-container">recommendation card</div>);
  }
}

RecommendationCard.propTypes = {};

const mapStateToProps = (state, ownProps) => {
  return { rec: ownProps.rec };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationCard);
