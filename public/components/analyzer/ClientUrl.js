import React from 'react';

class ClientUrl extends React.Component {
  onClickScorecard() {
    return (event) => {
      this.props.onClickScorecard(event);
    };
  }

  render() {
    let prompt = 'Enter a URL';
    let promptClasses = 'prompt-one';
    let cursorbarClasses = 'cursor-bar';
    let clientUrlClasses = 'client-url tk-bookmania';

    if (this.props.error) {
      prompt = this.props.error.message;
      promptClasses = `${promptClasses} error`;
      cursorbarClasses = `${cursorbarClasses} error`;
      clientUrlClasses = `${clientUrlClasses} error`;
    }

    return (
      <div className="website-analyzer">
        <div className="stag-large-container">
          <div className="stag-image-large"></div>
        </div>

        <div className="website-analyzer-prompt">
          <div className={promptClasses}>
            {prompt}
          </div>
        </div>

        <form className="url-box" onSubmit={this.onClickScorecard()}>
          <input className={clientUrlClasses} type="text" />
          <div className={cursorbarClasses}></div>

          <button type="submit" className="btn btn-primary start-analyzer-btn">
            Analyze
          </button>
        </form>
      </div>
    );
  }
}

ClientUrl.propTypes = {
  onClickScorecard: React.PropTypes.func.isRequired,
  error: React.PropTypes.shape({
    message: React.PropTypes.string.isRequired
  })
};

module.exports = ClientUrl;