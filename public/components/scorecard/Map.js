import React from 'react';
import { Chart } from 'react-google-charts';

import alexaPropTypes from 'propTypes/alexa';

class Map extends React.Component {
  render() {
    let countries = [];
    const rows = [];

    const columns = [{
      type: 'string',
      label: 'Country',
    },
    {
      type: 'number',
      label: 'Contribution',
    },
    {
      type: 'string',
      role: 'tooltip',
    }];

    const options = {
      displayMode: 'Regions',
      legend: 'none',
      backgroundColor: '#FBF8F2',
      colorAxis: {
        colors: ['FCF8F2', '#FAAF40'],
      },
      defaultColor: '#FCF8F2',
      tooltip: {
        textStyle: {
          color: '#737373',
          fontName: 'Cinzel',
        },
      },
    };

    if (this.props.alexa && this.props.alexa.countries)
      countries = this.props.alexa.countries;

    countries.forEach((country) => {
      rows.push([country.countryName,
                 country.contributionPageviews * 100,
                 `${(country.contributionPageviews * 100).toFixed(1)}% of Pageviews`]);
    });

    return (
      <div className="map-container">
        <div className="map-decoration"></div>
        <div className="map-border">
          <div className="map-container-inner">
            <div className="map-title">
              <h3>Pageview Contribution by Country</h3>
            </div>
            <div className="map-window">
              <Chart
                chartType="GeoChart"
                rows={rows}
                columns={columns}
                options={options}
                graph_id="GeoChart"
                width="700px"
                height="278px"
                legend_toggle
               />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Map.propTypes = alexaPropTypes.isRequired;

module.exports = Map;
