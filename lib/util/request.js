import request from 'request-promise';

async function get(url, qs) {
  try {
    const response = await request({ url, qs });
    return JSON.parse(response);
  } catch (error) {
    return error;
  }
}

export default {
  get,
};
