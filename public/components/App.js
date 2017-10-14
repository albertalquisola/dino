import React from 'react';

class App extends React.Component {
  componentWillMount() {
    // if user has registered but does not have beta access
    // send them to access denied page
    if (this.props.user.registrationComplete &&
        !this.props.user.hasBetaAccess) {
      this.context.router.push('/access-denied');

    // if user has not yet registered, force them back to homepage
    } else if (!this.props.user.hasBetaAccess &&
               !this.props.user.registrationComplete &&
               this.props.location.pathname !== '/error') {
      this.context.router.push('/');
    }
  }

  render() {
    const body = document.getElementsByTagName('body')[0];

    this.props.location.pathname === '/access-denied' ||
    this.props.location.pathname === '/' ?
      body.id = 'outside-app' :
      body.id = 'inside-app';

    return (
      <div id="app">
        {this.props.children}
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

App.propTypes = {
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
      name: React.PropTypes.string,
    }),

    name: React.PropTypes.shape({
      familyName: React.PropTypes.string,
      givenName: React.PropTypes.string,
    }),
  }),
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
  children: React.PropTypes.node.isRequired,
};

module.exports = App;
