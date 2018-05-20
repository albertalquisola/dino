import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Headerbar from 'components/lib/headerbar/Headerbar';
import { fetchUserRecommendations } from 'actions/recommendation';

class MyRecs extends React.Component {
  componentWillMount() {
    this.props.getRecommendations(this.props.userId);
  }

  render() {
    return (
      <div>
        <Headerbar />
      </div>
    );
  }
}

MyRecs.propTypes = {
  userId: PropTypes.number,
  getRecommendations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    userId: _.get(state, 'user.data.id'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecommendations: (userId) => dispatch(fetchUserRecommendations(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyRecs);
