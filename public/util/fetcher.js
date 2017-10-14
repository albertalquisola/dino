import _ from 'lodash';
import fetch from 'isomorphic-fetch';

function checkStatusCode(response) {
  if (response.status >= 200 && response.status < 300)
    return response;

  response.error = new Error(response.statusCodeText);
  return response;
}

function parseJson(response) {
  return response.json();
}

/*
 * fetcher wrapper for making convenient async calls to the server
 * always returns a promise which can be easily chained
 *
 */
const fetcher = {
  get: (url) => {
    return fetch(url, {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
    .then(checkStatusCode)
    .then(parseJson);
  },

  post: (url, data) => {
    if (!data) {
      console.warn('trying to send a post request with no data!');
      data = {};
    }

    return fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(data),
    })
    .then(checkStatusCode)
    .then(parseJson);
  },

  patch: (url, data) => {
    if (!data) {
      console.warn('trying to send a patch request with no data!');
      data = {};
    }

    return fetch(url, {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(data),
    })
    .then(checkStatusCode)
    .then(parseJson);
  },
};

export default fetcher;
