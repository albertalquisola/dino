import _ from 'lodash';

import { CITY } from 'enums';

export function getLocationDetail(place, LocationType) {
  let locationDetail;

  _.each(place.address_components, (ac) => {
    if (_.includes(ac.types, LocationType))
      locationDetail = ac;
  });

  return locationDetail;
}

export function constructCitySearchQuery(place) {
  const city = getLocationDetail(place, CITY);
  let seenCity = false;
  let searchQuery = '';

  _.each(place.address_components, (ac) => {
    if (ac === city)
      seenCity = true;

    if (seenCity)
      searchQuery += `${ac.long_name} `;
  });

  return _.trim(searchQuery);
}
