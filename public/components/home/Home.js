import React from 'react';
import PropTypes from 'prop-types';

import Headerbar from 'components/lib/headerbar/Headerbar';
import CitySearchbox from 'components/lib/searchbox/CitySearchbox';
import LoginModal from 'components/modals/LoginModal';

export default class Home extends React.Component {
  render() {
    return (
      <div className="homepage">
        <Headerbar />
        <div className="balloons-bg">
          <div className="search-prompt">Search for Recommendations</div>
          <CitySearchbox />
        </div>
        <LoginModal />
      </div>
    );
  }
}

Home.propTypes = {};
