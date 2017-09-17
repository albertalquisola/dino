import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AccessDenied extends React.Component {
  componentWillMount() {
    if (this.props.user &&
    this.props.user.registrationComplete &&
    this.props.user.hasBetaAccess) {
      this.context.router.push('/');
    }
  }

  render() {
    return (
      <div className="access-denied">
        <div className="stag-large-container">
          <ReactCSSTransitionGroup
            transitionName="stag-layer-1"
            transitionAppear={true}
            transitionAppearTimeout={500}>
            <div className="stag-layer layer-1" key="layer-1"></div>
          </ReactCSSTransitionGroup>
          <ReactCSSTransitionGroup
            transitionName="stag-layer-2"
            transitionAppear={true}
            transitionAppearTimeout={500}>
            <div className="stag-layer layer-2" key="layer-2"></div>
          </ReactCSSTransitionGroup>
          <ReactCSSTransitionGroup
            transitionName="stag-layer-3"
            transitionAppear={true}
            transitionAppearTimeout={500}>
            <div className="stag-layer layer-3" key="layer-3"></div>
          </ReactCSSTransitionGroup>
          <ReactCSSTransitionGroup
            transitionName="stag-layer-4"
            transitionAppear={true}
            transitionAppearTimeout={1000}>
            <div className="stag-layer layer-4" key="layer-4"></div>
          </ReactCSSTransitionGroup>
          <ReactCSSTransitionGroup
            transitionName="stag-layer-5"
            transitionAppear={true}
            transitionAppearTimeout={1000}>
            <div className="stag-layer layer-5" key="layer-5"></div>
          </ReactCSSTransitionGroup>
          <ReactCSSTransitionGroup
            transitionName="stag-layer-6"
            transitionAppear={true}
            transitionAppearTimeout={250}>
            <div className="stag-layer layer-6" key="layer-6"></div>
          </ReactCSSTransitionGroup>
          <div className="denied-msg">
            <ReactCSSTransitionGroup
              transitionName="stag-layer-6b"
              transitionAppear={true}
              transitionAppearTimeout={250}>
              <h3 key="layer-6b">The door remains locked</h3>
            </ReactCSSTransitionGroup>
            <ReactCSSTransitionGroup
              transitionName="stag-layer-7"
              transitionAppear={true}
              transitionAppearTimeout={500}>
              <h3 className="forNow" key="layer-7"> ...for now</h3>
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}

AccessDenied.contextTypes = {
  router: React.PropTypes.object.isRequired
};

AccessDenied.propTypes = {
  user: React.PropTypes.shape({
    isFetching: React.PropTypes.bool,
    id: React.PropTypes.number,
    user_id: React.PropTypes.number,
    email: React.PropTypes.string,
    fullName: React.PropTypes.string,
    is_admin: React.PropTypes.number,
    linkedin_id: React.PropTypes.string,
    new_user: React.PropTypes.number,
    registrationComplete: React.PropTypes.bool,
    hasBetaAccess: React.PropTypes.number,
    companies: React.PropTypes.array,

    currentAgency: React.PropTypes.shape({
      agency_id: React.PropTypes.number,
      linkedin_id: React.PropTypes.string,
      name: React.PropTypes.string
    }),

    name: React.PropTypes.shape({
      familyName: React.PropTypes.string,
      givenName: React.PropTypes.string
    })
  })
};

module.exports = AccessDenied;
