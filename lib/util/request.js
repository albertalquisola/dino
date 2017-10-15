import request from 'request-promise';

async function get({ url, qs }) {
  try {
    const response = await request({ url, qs });
    return { error: null, response: JSON.parse(response) };
  } catch (error) {
    return { error, response: null };
  }
}

export default {
  get,
};
