import models from 'models';
import Logger from 'util/Logger';

const log = new Logger('services/recommendation');

async function createRec(placeId, userId) {
  try {
    return await models.recommendation.createRec(placeId, userId);

  } catch (error) {
    log.error('createRec', 'error creating rec from recommendation service', { error });
    throw error;
  }
}

export default {
  createRec,
};
