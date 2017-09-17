import React from 'react';

class NotFound extends React.Component {
  render() {
    return (
      <div className="not-found">
        <h1 className="error-text">
          this is our catch all 404 page!
        </h1>
      </div>
    );
  }
}

module.exports = NotFound;