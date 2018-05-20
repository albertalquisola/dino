import { COUNTY } from 'enums';
import { getLocationDetail } from 'util/location';
import Logger from 'util/Logger';
import models from 'models';

const log = new Logger('services/county');

async function upsertCountyFromCity(city) {
  try {
    const countyDetails = getLocationDetail(city, COUNTY);

    // no-op if city does not have a county (say a city in japan where there are no counties)
    if (!countyDetails)
      return;

    return await models.county.upsertCounty(countyDetails.long_name);

  } catch (error) {
    log.error('upsertCountyFromCity', 'error upserting county', { error });
    throw error;
  }
}


export default {
  upsertCountyFromCity,
};
