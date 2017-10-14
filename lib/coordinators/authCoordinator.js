import { getLongLivedToken } from 'services/facebook';

async function facebookSignup(req, accessToken, refreshToken, profile, mainCallback) {
    const longLivedToken = await getLongLivedToken(accessToken);
    console.log(longLivedToken);
}

export default { facebookSignup };
