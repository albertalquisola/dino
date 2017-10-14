import request from 'util/request';
import Logger from 'util/Logger';

const log = new Logger('services/facebook');

export async function getLongLivedToken(accessToken) {
  const url = 'https://graph.facebook.com/oauth/access_tokenfeaf';
  const qs = {
    grant_type: 'fb_exchange_token',
    client_id: process.env.FACEBOOK_APP_ID,
    client_secret: process.env.FACEBOOK_SECRET,
    fb_exchange_token: accessToken,
  };

  let { response, error } = await request.get({ url, qs });
  if (error) {
    log.logError('getLongLivedToken', 'error occurred when getting long lived token', { error });
    return { response, error };
  }

  if (response.statusCode > 300 || response.statusCode < 200) {
    log.error('getLongLivedToken', 'bad response from facebook', { msg: response.body, statusCode: response.statusCode });
    error = new Error('bad response from facebook');
  }

  return { response, error };
}
