import models from 'models';
import request from 'util/request';
import Logger from 'util/Logger';

const log = new Logger('services/facebook');

export async function saveFacebookData({ accessTokenResponse, facebookId }) {
  const accessToken = accessTokenResponse.access_token;
  const expiresIn = accessTokenResponse.expires_in;

  const { error, results } = await models.facebook.saveFacebookData({ accessToken, facebookId, expiresIn });
  if (error) {
    log.error('saveFacebookData', 'error recording facebook auth info', { error, facebookId });
  }

  return { error, results };
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

  const { error, response } = await request.get({ url, qs });
  if (error) {
    log.error('getLongLivedToken', 'error occurred when getting long lived token', { error });
  }

  return { error, response };
}
