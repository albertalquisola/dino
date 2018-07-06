import React from 'react';
import PropTypes from 'prop-types';

import User from 'isomorphic/models/User';

export default class FriendBubble extends React.Component {
  render() {
    return (
      <div className="FriendBubble">
        <img role="presentation" src={this.props.friend.profilePic} />
      </div>
    );
  }
}

FriendBubble.propTypes = {
  friend: PropTypes.instanceOf(User).isRequired,
};