import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CitySearchbox from 'components/lib/searchbox/CitySearchbox';
import ShareRecButton from 'components/lib/buttons/shareRec/ShareRecButton';
import LoggedInButton from 'components/lib/buttons/loggedin/LoggedInButton';
import LoginButton from 'components/lib/buttons/login/LoginButton';
import LoginModal from 'components/modals/LoginModal';

export default class Headerbar extends React.Component {
  render() {
    const citySearchBox = this.props.showSearchbar ? <CitySearchbox /> : null;

    return (
      <div className="headerbar">
        <Link to="/">
          <div className="company-name">Dino</div>
        </Link>

        {citySearchBox}

        <nav className="nav">
          <Link to="/recommendations/add">
            <ShareRecButton />
          </Link>

          <LoggedInButton />
          <LoginButton />
        </nav>

        <LoginModal />
      </div>
    );
  }
}

Headerbar.propTypes = {
  showSearchbar: PropTypes.bool,
};