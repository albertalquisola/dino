import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

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
  get: async (url, qs) => {
    url = qs ? `${url}?${queryString.stringify(qs)}` : url;

    try {
      const response = await fetch(url, { credentials, headers });
      return await response.json();

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
      let response = await fetch(url, { credentials, headers, method: 'POST', body: JSON.stringify(data) });
      response = await response.json();

      return response;

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
      let response = await fetch(url, { credentials, headers, method: 'PATCH', body: JSON.stringify(data) });
      response = await response.json();

      return response;

    } catch (error) {
      throw error;
    }
  },
};

export default fetcher;
