import React from 'react';
import TransitionComponent from 'components/reusable/TransitionComponent';

class Spinner extends TransitionComponent {
  render() {
    return (
      <div ref={this.grabDomNode()}>
       spinner goes here
      </div>
    );
  }
}

module.exports = Spinner;