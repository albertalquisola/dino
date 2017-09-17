import _ from 'lodash';
import React from 'react';
import { findDOMNode } from 'react-dom';
import PlacesAutocomplete from 'react-places-autocomplete';

import TestNode from 'components/lib/TestNode';

const AutocompleteItem = ({ formattedSuggestion }) => (
  <div className="item">
    <i className="fa fa-map-marker"/>
    <strong>{formattedSuggestion.mainText}</strong>{' '}
    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
  </div>
);

const placeholder = 'Pick a place, any place...';

class SimpleForm extends React.Component {
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

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder,
    };


    return (
      <div>
        <PlacesAutocomplete
          inputProps={inputProps}
          onSelect={this.onSelect}
          onError={this.onError}
          autocompleteItem={AutocompleteItem}
        />
        <TestNode ref={(reference) => { this.reference = reference; }} />
      </div>
    );
  }
}

export default SimpleForm;

SimpleForm.propTypes = {};
