import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import PlacesAutocomplete from 'react-places-autocomplete';

import GoButton from 'components/lib/buttons/go/GoButton';

const AutocompleteItem = ({ formattedSuggestion }) => (
  <div className="item">
    <i className="fa fa-map-marker" />
    <strong>{formattedSuggestion.mainText}</strong>{' '}
    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
  </div>
);

const placeholder = 'Choose a City';

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
      this.props.onSearch(place, status);
      window.place = place;
      console.log(place);
      console.log(status);
    });
  }

  onError(errorMsg) {
    if (errorMsg === 'ZERO_RESULTS') {
      console.log('sorry, no results available');
    }
  }

  go() {
    console.log('going!');
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder,
    };


    return (
      <div className="searchbox-container">
        <PlacesAutocomplete
          inputProps={inputProps}
          onSelect={this.onSelect}
          onError={this.onError}
          autocompleteItem={AutocompleteItem}
        />
        <GoButton onClick={this.go} />

        <div className="hidden-places-mount" ref={(reference) => { this.reference = reference; }}></div>
      </div>
    );
  }
}

Searchbox.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbox;

