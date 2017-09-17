import React from 'react';

import FacebookLogin from 'components/lib/FacebookLogin';
import Searchbox from 'components/lib/Searchbox';

export default class Home extends React.Component {
  render() {
    return (
      <div className="homepage">
        <Searchbox />
        <FacebookLogin />
      </div>
    );
  }
}

Home.propTypes = {};

