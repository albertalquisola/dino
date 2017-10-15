import models from 'models';
import Logger from 'util/Logger';

const log = new Logger('services/user');

export async function createUser({ firstName, lastName, email, password, facebookAuthId }) {
  const { error, results } = await models.user.insertUser({ firstName, lastName, email, password, facebookAuthId });
  if (error) {
    log.error('createUser', 'error creating user', { error, email });
  }

  return { error, results };
}

export async function getUserById(id) {
  try {
    return await models.user.getUserById(id);

  } catch (error) {
    log.error('getUserById', 'error getting user by ID', { error, id });
    throw error;
  }
}
