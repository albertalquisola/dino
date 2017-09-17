import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import withScriptJs from 'react-google-maps/lib/async/withScriptJs';

/* SAMPLE GOOGLE MAP. USE AS REFERENCE FOR LATER */

const apiKey = 'AIzaSyAQHgooJ9_5Ub3ruI2UWZQ0p15h4eF8CQ8';
const mapUrl = 'https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=';
const googleMapUrl = `${mapUrl}${apiKey}`;

const GettingStartedGoogleMap = withScriptJs(
  withGoogleMap(props => {
    return (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={3}
        defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
        onClick={props.onMapClick}
      >
      </GoogleMap>
    );
  })
);

export default class Map extends React.Component {
  render() {
    return (
      <div className="homepage">
        <GettingStartedGoogleMap
          googleMapURL={googleMapUrl}
          loadingElement={<div style={{ height: `100%` }}></div>}
          containerElement={<div style={{ height: `100%` }}> </div>}
          mapElement={<div style={{ height: `100%` }}> </div>}
          onMapLoad={_.noop}
          onMapClick={_.noop}
        />
      </div>
    );
  }
}

Map.propTypes = {};

