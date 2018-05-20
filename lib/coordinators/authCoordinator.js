import Logger from 'util/Logger';
import { getProfilePic, getFacebookFriends, saveFacebookData, getLongLivedToken, formatFacebookName } from 'services/facebook';
import { upsertUser, getUsersByFacebookId } from 'services/user';
import { saveFriends } from 'services/friend';

const log = new Logger('coordinators/auth');

async function facebookSignup(req, accessToken, refreshToken, profile, callback) {
  profile = formatFacebookName(profile);
  const firstName = profile.name.givenName;
  const lastName = profile.name.familyName;
  const email = profile.email;
  const facebookId = profile.id;

  try {
    const longLivedAccessToken = await getLongLivedToken(accessToken);
    const fbData = await saveFacebookData({ facebookId, longLivedAccessToken });
    const fbFriends = await getFacebookFriends(facebookId, longLivedAccessToken.access_token);
    const profilePic = await getProfilePic(facebookId, longLivedAccessToken.access_token);
    const user = await upsertUser({ firstName, lastName, email, profilePic, facebookAuthId: fbData.insertId });
    const userFriends = await getUsersByFacebookId(fbFriends);
    await saveFriends(user.insertId, userFriends);

    return callback(null, user.insertId);

  } catch (error) {
    log.error('facebookSignup', 'error when trying to auth with facebook', { error });

    return callback(error);
  }
}

export default { facebookSignup };
