import request from 'request-promise';
import Logger from 'util/Logger';

const log = new Logger('util/request');

async function get({ url, qs }) {
  try {
    const response = await request({ url, qs });
    return JSON.parse(response);

  } catch (error) {
    log.error('get', 'error performing http request', { error });
    throw error;
  }
}

export default {
  get,
};
