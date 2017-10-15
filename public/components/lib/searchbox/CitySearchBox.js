import { connect } from 'react-redux';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import PlacesAutocomplete from 'react-places-autocomplete';

import AutocompleteItem from 'components/lib/searchbox/AutocompleteItem';
import GoButton from 'components/lib/buttons/go/GoButton';

const placeholder = 'Choose a City';

class CitySearchBox extends React.Component {
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
    const options = { types: ['(cities)'] };
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Pick a City',
    };

    return (
      <div className="searchbox-container">
        <PlacesAutocomplete
          inputProps={inputProps}
          onSelect={this.onSelect}
          onError={this.onError}
          options={options}
          autocompleteItem={AutocompleteItem}
        />
        <GoButton onClick={this.go} />

        <div className="hidden-city-places-mount" ref={(reference) => { this.reference = reference; }}></div>
      </div>
    );
  }
}

CitySearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: () => { console.log('temporary'); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CitySearchBox);

