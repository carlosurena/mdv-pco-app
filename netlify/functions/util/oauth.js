const { AuthorizationCode } = require('simple-oauth2');

function createAuthClient(credentials) {
  if (!credentials.client.id || !credentials.client.secret) {
    throw new Error(
      'Missing a valid PCO OAuth client ID and secret.'
    );
  }

  return new AuthorizationCode(credentials);
}

module.exports = createAuthClient({
  client: {
    id: process.env.REACT_APP_PCO_CLIENT_ID,
    secret: process.env.REACT_APP_PCO_SECRET,
  },
  auth: {
    tokenHost: 'https://api.planningcenteronline.com/',
    tokenPath: '/oauth/token',
    authorizePath: process.env.PCO_API_URL + "oauth/token",
  },
});