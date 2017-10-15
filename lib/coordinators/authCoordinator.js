import Logger from 'util/Logger';
import { saveFacebookData, getLongLivedToken, formatFacebookName } from 'services/facebook';
import { createUser } from 'services/user';

const log = new Logger('coordinators/auth');

async function facebookSignup(req, accessToken, refreshToken, profile, callback) {
  profile = formatFacebookName(profile);
  const firstName = profile.name.givenName;
  const lastName = profile.name.familyName;
  const email = profile.email;
  const facebookId = profile.id;

  let accessTokenResponse, fbData, user, error;

  ({ error, response: accessTokenResponse } = await getLongLivedToken(accessToken));
  if (error) {
      log.error('facebookSignup', 'error getting long lived token', { error });
      return callback(error);
  }

  ({ error, results: fbData } = await saveFacebookData({ facebookId, accessTokenResponse }));
  if (error) {
    log.error('facebookSignup', 'error saving facebook data', { error, facebookId, profile });
    return callback(error);
  }

  ({ error, results: user } = await createUser({ firstName, lastName, email, facebookAuthId: fbData.insertId }));
  if (error) {
    log.error('facebookSignup', 'error creating new user', { error });
    return callback(error);
  }

  return callback(null, user.insertId);
}

export default { facebookSignup };
