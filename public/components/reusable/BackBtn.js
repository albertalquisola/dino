import React from 'react';
import { Link } from 'react-router';

class BackBtn extends React.Component {
  onClickBack() {
    return () => {
      if (this.props.onClick && typeof this.props.onClick === 'function')
        this.props.onClick();

      if (!this.props.path)
        this.context.router.goBack();
    };
  }

  render() {
    let backBtn;

    if (this.props.path) {
      backBtn = (
        <div className="back">
          <Link to={this.props.path} className="back-container" onClick={this.onClickBack()}>
            <span className="fa fa-arrow-circle-left back-btn"></span>
            <span className="text">back</span>
          </Link>
        </div>
      );

    } else {
      backBtn = (
        <div className="back">
          <div className="back-container" onClick={this.onClickBack()}>
            <span className="fa fa-arrow-circle-left back-btn"></span>
            <span className="text">back</span>
          </div>
        </div>
      );
    }

    return backBtn;
  }
}

BackBtn.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

BackBtn.propTypes = {
  onClick: React.PropTypes.func,
  path: React.PropTypes.string,
};

module.exports = BackBtn;