import React from 'react';
import PropTypes from 'prop-types';

const AutocompleteItem = ({ formattedSuggestion }) => (
  <div className="item">
    <i className="fa fa-map-marker" />
    <strong>{formattedSuggestion.mainText} </strong>
    <small className="text-muted"> {formattedSuggestion.secondaryText}</small>
  </div>
);

AutocompleteItem.propTypes = {
  formattedSuggestion: PropTypes.shape({
    mainText: PropTypes.string,
    secondaryText: PropTypes.string,
  }),
};

export default AutocompleteItem;
