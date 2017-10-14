import React from 'react';

import ShareRecButton from 'components/lib/buttons/shareRec/ShareRecButton';
import LoginButtonContainer from 'components/lib/buttons/login/LoginButtonContainer';

export default class Headerbar extends React.Component {
  render() {
    return (
      <div className="headerbar">
        <div className="company-name">Dino</div>
        <nav className="nav">
          <ShareRecButton />
          <LoginButtonContainer />
        </nav>
      </div>
      );
  }
}
