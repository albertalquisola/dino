import { connect } from 'react-redux';

import YourRecs from 'components/yourRecs/yourRecs';
import { saveSearch } from 'actions/search';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (place, status) => { dispatch(saveSearch(place, status)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YourRecs);
