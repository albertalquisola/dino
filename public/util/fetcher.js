import _ from 'lodash';
import fetch from 'isomorphic-fetch';

function checkStatusCode(response) {
  if (response.status >= 200 && response.status < 300)
    return response;

  const error = new Error(response.statusCodeText);
  response.error = error;

  return response;
}

function parseJson(response) {
  return response.json();
}

function callOptionalCallback(callback) {
  return (json) => {
    let data = _.cloneDeep(json);

    if (typeof json === 'string') {
      try {
        data = JSON.parse(json);

      } catch (e) {
        data = { error: new Error('error parsing JSON response!') };
      }
    }

    if (callback)
      return callback(data);

    return data;
  };
}

/*
 * fetcher wrapper for making convenient async calls to the server
 * always returns a promise which can be easily chained
 *
 */
const fetcher = {
  get: (url, callback) => {
    return fetch(url, {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(checkStatusCode)
    .then(parseJson)
    .then(callOptionalCallback(callback));
  },

  post: (url, data, callback) => {
    if (typeof data === 'function') {
      callback = data;
      data = {};
    }

    return fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(data)
    })
    .then(checkStatusCode)
    .then(parseJson)
    .then(callOptionalCallback(callback));
  },

  patch: (url, data, callback) => {
    if (typeof data === 'function') {
      callback = data;
      data = {};
    }

    return fetch(url, {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(data)
    })
    .then(checkStatusCode)
    .then(parseJson)
    .then(callOptionalCallback(callback));
  }
};

export default fetcher;
