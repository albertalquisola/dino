import $ from 'jquery';
import React from 'react';
import { TweenMax } from 'gsap';

class TransitionComponent extends React.Component {
  grabDomNode() {
    return (domNode) => {
      this.domNode = domNode;
    };
  }

  componentWillAppear(callback) {
    TweenMax.fromTo(this.domNode, 2, { opacity: 0 }, { opacity: 1, onComplete: callback });
  }

  componentWillEnter(callback) {
    $(this.domNode).hide();

    setTimeout(() => {
      $(this.domNode).show();
      TweenMax.fromTo(this.domNode, 2, { opacity: 0 }, { opacity: 1, onComplete: callback });
    }, 2000);
  }

  componentWillLeave(callback) {
    TweenMax.fromTo(this.domNode, 2, { opacity: 1 }, { opacity: 0, onComplete: callback });
  }
}

module.exports = TransitionComponent;