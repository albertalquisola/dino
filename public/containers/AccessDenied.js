import { connect } from 'react-redux';

import AccessDenied from 'components/AccessDenied';

const mapStateToProps = (state) => {
  return { user: state.user };
};

const AccessDeniedContainer = connect(mapStateToProps)(AccessDenied);

module.exports = AccessDeniedContainer;