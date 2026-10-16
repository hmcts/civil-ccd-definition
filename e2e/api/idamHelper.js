const config = require('../config.js');
const restHelper = require('./restHelper');
const {retry} = require('./retryHelper');
const NodeCache = require('node-cache');
const {URL, URLSearchParams} = require('url');

// IDAM access token expires every 8 hours
const idamTokenCache = new NodeCache({ stdTTL: 25200, checkperiod: 1800 });

const idamTestSupportUrl = config.idamStub.enabled ? config.idamStub.url : config.url.idamTestSupportApi;
const adminUser = config.idamStub.enabled ? config.idamStub.url : config.ctscAdminUser;
const idamClientId = 'ccd_gateway';

function getIdamTokenUrl() {
  if (config.idamStub.enabled) {
    return `${config.idamStub.url}/oauth2/token`;
  }

  const idamApiUrl = config.url.idamApi.replace(/\/+$/, '');

  return idamApiUrl.endsWith('/o/token')
    ? idamApiUrl
    : `${idamApiUrl}/o/token`;
}

function getIdamUserInfoUrl() {
  if (config.idamStub.enabled) {
    return `${config.idamStub.url}/o/userinfo`;
  }

  const userInfoUrl = new URL(getIdamTokenUrl());
  userInfoUrl.pathname = '/o/userinfo';
  userInfoUrl.search = '';

  return userInfoUrl.toString();
}

async function getAccessTokenFromIdam(user) {
  if (config.idamStub.enabled) {
    return restHelper.retriedRequest(
      `${getIdamTokenUrl()}?username=${encodeURIComponent(user.email)}&password=${encodeURIComponent(user.password)}`,
      {'Content-Type': 'application/x-www-form-urlencoded'}
    )
      .then(response => response.json())
      .then(data => data.access_token);
  }

  const clientSecret = process.env.CCD_API_GATEWAY_IDAM_CLIENT_SECRET;

  if (!clientSecret) {
    throw new Error('CCD_API_GATEWAY_IDAM_CLIENT_SECRET is not configured');
  }

  const formBody = new URLSearchParams({
    grant_type: 'password',
    username: user.email,
    password: user.password,
    client_id: idamClientId,
    client_secret: clientSecret,
    scope: 'openid profile roles'
  }).toString();

  return restHelper.retriedFormRequest(
    getIdamTokenUrl(),
    {'Content-Type': 'application/x-www-form-urlencoded'},
    formBody
  )
    .then(response => response.json())
    .then(data => data.access_token);
}

async function accessToken(user) {
    console.log('User logged in', user.email);
    if (idamTokenCache.get(user.email) != null) {
        console.log('User access token coming from cache', user.email);
        return idamTokenCache.get(user.email);
    } else {
        if (user.email && user.password) {
            const accessToken = await getAccessTokenFromIdam(user);
            idamTokenCache.set(user.email, accessToken);
            console.log('user access token coming from idam', user.email);
            return accessToken;
        } else {
            console.log('*******Missing user details. Cannot get access token******');
        }
    }
}

async function userId(authToken) {
  const method = config.idamStub.enabled ? 'POST' : 'GET';

  return retry(async () => {
    const response = await restHelper.request(
      getIdamUserInfoUrl(),
      {
        'Authorization': `Bearer ${authToken}`
      },
      undefined,
      method
    );

    if (response.status !== 200) {
      throw new Error(`Expected status: 200, actual status: ${response.status}, `
        + `message: ${response.statusText}, url: ${response.url}`);
    }

    return response.json().then(data => data.uid);
  });
}

async function createAccount(email, password) {
  try {
    const token = await accessToken(adminUser);
    let body = {'password': password, 'user': {'email': email, 'forename': 'forename', 'surname': 'surname', 'displayName': 'displayName', 'roleNames': ['citizen']}};
    await restHelper.retriedRequest(`${idamTestSupportUrl}/test/idam/users`, {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, body, 'POST', [201, 409]);

    console.log('Account created: ', email);

  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
}

/*async function createAccount(email, password) {
  try {
    let body = {'email': email, 'password': password, 'forename': 'forename', 'surname': 'surname', 'roles': [{'code': 'citizen'}]};
    await restHelper.request(`${idamUrl}/testing-support/accounts/`, {'Content-Type': 'application/json'}, body);

    console.log('Account created: ', email);

  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
} */

async function deleteCitizenAccount(email) {
  if(!process.env.CLAIMANT_CITIZEN_EMAIL && !process.env.DEFENDANT_CITIZEN_EMAIL) {
    try {
      const token = await accessToken(adminUser);
      let method = 'DELETE';
      await restHelper.request(`${idamTestSupportUrl}/test/idam/users/${email}`, {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, undefined, method);

      console.log('Account deleted: ' + email);
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  }
}

module.exports = {
    accessToken,
    userId,
  createAccount,
deleteCitizenAccount,
};
