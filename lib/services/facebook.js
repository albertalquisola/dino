import _ from 'lodash';
import FB from 'fb';
import req from 'request';

import config from 'config';
import models from 'models';
import request from 'util/request';
import Logger from 'util/Logger';

const log = new Logger('services/facebook');
const rawRequest = req.defaults({ encoding: null });

export async function getProfilePic(fbId, accessToken) {
  const qs = { access_token: accessToken, redirect: false, type: 'large' };

  return new Promise((resolve, reject) => {
    FB.api(`${fbId}/picture`, qs, (response) => {
      if (response.error) {
        log.error('getProfilePic', 'error getting profile pic for user', { error: response.error, fbId });
        return reject(new Error(response.error.code));
      }

      const url = _.get(response, 'data.url');
      if (!url) {
        log.error('getProfilePic', 'error getting url for profile pic', { url, fbId });
        return reject(new Error('error getting url for fb profile pic'));
      }

      rawRequest.get(url, (error, res, body) => {
        if (error) {
          log.error('getProfilePic', 'error getting img data for profile pic', { error });
          return reject(error);
        }

        if (res.statusCode !== config.successCode) {
          log.error('getProfilePic', 'error getting img data for profile pic', { response });
          return reject(new Error('got non 200 status code when fetching fb profile pic'));
        }

        const base64Image = new Buffer(body).toString('base64');
        const profilePic = `data:${res.headers['content-type']};base64,${base64Image}`;

        return resolve(profilePic);
      });
    });
  });
}

export async function getFacebookFriends(fbId, accessToken) {
  const qs = { access_token: accessToken };

  return new Promise((resolve, reject) => {
    FB.api(`${fbId}/friends`, qs, (response) => {
      if (response.error) {
        log.error('saveFacebookFriends', 'error fetching fb friends for user', { error: response.error, fbId });
        return reject(new Error(response.error.message));
      }

      return resolve(response.data);
    });
  });
}

export async function saveFacebookData({ longLivedAccessToken, facebookId }) {
  const accessToken = longLivedAccessToken.access_token;
  const expiresIn = longLivedAccessToken.expires_in;

  try {
    return await models.facebook.saveFacebookData({ accessToken, facebookId, expiresIn });

  } catch (error) {
    log.error('saveFacebookData', 'error recording facebook auth info', { error, facebookId });
    throw error;
  }
}

export function formatFacebookName(profile) {
  if (!profile.name.givenName && !profile.name.familyName && !profile.displayName) {
    profile.name.givenName = 'user';
  }

  if (!profile.name.givenName && !profile.name.familyName && profile.displayName) {
    const names = profile.displayName.split(' ');
    profile.name.givenName = names[0];

    if (names.length === 2) {
      profile.name.familyName = names[1];
    }
  }

  return profile;
}

export async function getLongLivedToken(accessToken) {
  const url = 'https://graph.facebook.com/oauth/access_token';
  const qs = {
    grant_type: 'fb_exchange_token',
    client_id: process.env.FACEBOOK_APP_ID,
    client_secret: process.env.FACEBOOK_SECRET,
    fb_exchange_token: accessToken,
  };

  try {
    return await request.get({ url, qs });
  } catch (error) {
    log.error('getLongLivedToken', 'error occurred when getting long lived token', { error });
    throw error;
  }
}
