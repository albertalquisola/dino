import React from 'react';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      competitorId: props.competitorId,
      checked: props.isChecked || false,
      name: props.name
    };

    this.registerCheckbox(this);
  }

  onClick() {
    return () => {
      this.setState({ checked: !this.state.checked }, () => {
        if (this.props.checkAction && typeof this.props.checkAction === 'function')
          this.props.checkAction();
      });
    };
  }

  registerCheckbox(checkbox) {
    if (this.props.trackCheckbox && typeof this.props.trackCheckbox === 'function')
      this.props.trackCheckbox(checkbox);
  }

  render() {
    let checkmark;

    if (this.state.checked)
      checkmark = <i className="fa fa-check checkmark"></i>;

    return (
      <div className="checkbox-container">
        <span className="check-box" onClick={this.onClick()}>
          {checkmark}
        </span>

        <span className="competitor-name tk-bookmania">{this.props.name}</span>
      </div>
    );
  }
}

Checkbox.propTypes = {
  competitorId: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  trackCheckbox: React.PropTypes.func,
  isChecked: React.PropTypes.bool,
  checkAction: React.PropTypes.func
};

module.exports = Checkbox;
