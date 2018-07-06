import { connect } from 'react-redux';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import PlacesAutocomplete from 'react-places-autocomplete';

import AutocompleteItem from 'components/lib/searchbox/AutocompleteItem';

import { saveRecommendation } from 'actions/recommendation';

class Searchbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { address: '' };
    this.onChange = (address) => this.setState({ address });

    _.bindAll(this, ['onSelect', 'onError']);
  }

  componentDidMount() {
    this.detailsService = new window.google.maps.places.PlacesService(findDOMNode(this.reference));
  }

  onSelect(address, placeId) {
    this.setState({ address, placeId });
    this.detailsService.getDetails({ placeId }, (place, status) => {
      console.log(place);
      this.props.onSearch(placeId, place, status);
    });
  }

  onError(errorMsg) {
    if (errorMsg === 'ZERO_RESULTS') {
      console.log('sorry, no results available');
    }
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Add a Place',
    };

    return (
      <div className="searchbox-container">
        <PlacesAutocomplete
          highlightFirstSuggestion={true}
          inputProps={inputProps}
          onSelect={this.onSelect}
          onError={this.onError}
          autocompleteItem={AutocompleteItem}
        />

        <div className="hidden-places-mount" ref={(reference) => { this.reference = reference; }}></div>
      </div>
    );
  }
}

Searchbox.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (placeId, place, status) => { dispatch(saveRecommendation(placeId, place, status)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Searchbox);

