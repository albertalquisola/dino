import React from 'react';
import { Link } from 'react-router';

import ShareRecButton from 'components/lib/buttons/shareRec/ShareRecButton';
import LoginButton from 'components/lib/buttons/login/LoginButton';

export default class Headerbar extends React.Component {
  render() {
    return (
      <div className="headerbar">
        <Link to="/">
          <div className="company-name">Dino</div>
        </Link>
        <nav className="nav">
          <Link to="/add-recs">
            <ShareRecButton />
          </Link>
          <LoginButton />
        </nav>
      </div>
      );
  }
}
