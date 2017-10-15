import fetch from 'isomorphic-fetch';

const credentials = 'same-origin';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

/*
 * fetcher wrapper for making convenient async calls to the server
 * always returns a promise which can be easily chained
 *
 */
const fetcher = {
  get: async (url) => {
    try {
      const response = await fetch(url, { credentials, headers });
      return response.json();

    } catch (error) {
      throw error;
    }
  },

  post: async (url, data) => {
    if (!data) {
      console.warn('trying to send a post request with no data!');
      data = {};
    }

    try {
      const response = await fetch(url, { credentials, headers, method: 'POST', body: JSON.stringify(data) });
      return response.json();

    } catch (error) {
      throw error;
    }
  },

  patch: async (url, data) => {
    if (!data) {
      console.warn('trying to send a patch request with no data!');
      data = {};
    }

    try {
      const response = await fetch(url, { credentials, headers, method: 'PATCH', body: JSON.stringify(data) });
      return response.json();

    } catch (error) {
      throw error;
    }
  },
};

export default fetcher;
