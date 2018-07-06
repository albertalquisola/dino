import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { push } from 'react-router-redux';
import PlacesAutocomplete from 'react-places-autocomplete';

import actions from 'actions';
import AutocompleteItem from 'components/lib/searchbox/AutocompleteItem';

const placeholder = 'Choose a City';

class CitySearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { address: props.city };
    this.onChange = address => this.setState({ address });

    _.bindAll(this, ['onSelect', 'onError']);
  }

  componentDidMount() {
    this.detailsService = new window.google.maps.places.PlacesService(findDOMNode(this.reference));
  }

  async onSelect(address, placeId) {
    this.setState({ address, placeId });

    this.detailsService.getDetails({ placeId }, (place) => {
      this.props.setCurrentCity(place.name, placeId);
      this.props.searchForCityRecs(place.name, placeId);
    });
  }

  onError(errorMsg) {
    if (errorMsg === 'ZERO_RESULTS') {
      console.log('sorry, no results available');
    }
  }

  render() {
    const options = { types: ['(cities)'] };
    const inputProps = { placeholder, value: this.state.address, onChange: this.onChange };

    return (
      <div className="searchbox-container">
        <PlacesAutocomplete
          highlightFirstSuggestion={true}
          inputProps={inputProps}
          onSelect={this.onSelect}
          onError={this.onError}
          options={options}
          autocompleteItem={AutocompleteItem}
        />

        <div className="hidden-city-places-mount" ref={(reference) => { this.reference = reference; }}></div>
      </div>
    );
  }
}

CitySearchBox.contextTypes = {
  router: PropTypes.object.isRequired,
};

CitySearchBox.propTypes = {
  city: PropTypes.string,
  setCurrentCity: PropTypes.func.isRequired,
  searchForCityRecs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    city: _.get(state, 'currentCity.address') || '',
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentCity: (cityName, placeId) => {
      dispatch(actions.city.setCurrentCity(cityName, placeId));
    },

    searchForCityRecs: (cityName, placeId) => {
      dispatch(actions.recommendation.getFriendRecommendations(placeId));
      dispatch(push(`/friends/recommendations?city=${cityName}&placeId=${placeId}`));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CitySearchBox);

