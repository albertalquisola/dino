import React from 'react';
import seeThru from 'seethru';


class LoadingState extends React.Component {
  startVideo() {
    seeThru.create('.loading-state-video', { end: 'stop', width: 700, height: 442 });
  }

  render() {
    return (
      <div className="loading-state-container">
        <div className="stag-small-container">
          <div className="stag-image-small"></div>
        </div>
        <div className="video-container">
          <video className="loading-state-video" autoPlay muted onCanPlayThrough={this.startVideo}>
            <source src="/public/videos/gold-loading-state.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }
}

module.exports = LoadingState;