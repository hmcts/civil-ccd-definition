const config = require('../config.js');
const restHelper = require('./restHelper');
const NodeCache = require( 'node-cache' );
//Idam access token expires for every 8 hrs
const idamTokenCache = new NodeCache( { stdTTL: 25200, checkperiod: 1800 } );

const loginEndpoint = config.idamStub.enabled ? 'oauth2/token' : 'loginUser';
const idamUrl = config.idamStub.enabled ? config.idamStub.url : config.url.idamApi;

module.exports =  {
  accessToken: async (user) => {
    if (idamTokenCache.get(user.email) != null) {
        return idamTokenCache.get(user.email);
    } else {
        const accessToken = await this.getAccessTokenFromIdam(user);
        idamTokenCache.set(user.email, accessToken );
        return accessToken;
    }
  },

  getAccessTokenFromIdam: async (user) => {
     return restHelper.retriedRequest(
       `${idamUrl}/${loginEndpoint}?username=${encodeURIComponent(user.email)}&password=${user.password}`,
       {'Content-Type': 'application/x-www-form-urlencoded'})
       .then(response => response.json()).then(data => data.access_token);
  },

  userId: async (authToken) => {
    return restHelper.retriedRequest(
      `${idamUrl}/o/userinfo`,
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${authToken}`
      })
      .then(response => response.json()).then(data => data.uid);
  }
};
