import BaseRequest from '../base/base-request';
import urls from '../config/urls';
import { AllMethodsStep } from '../decorators/test-steps';
import RequestOptions from '../models/api/request-options';
import User from '../models/user';
import NodeCache from 'node-cache';

// IDAM access token expires every 8 hours
// stdTTL: 25200 seconds (7 hours), checkperiod: 1800 seconds (30 minutes)
const idamTokenCache = new NodeCache({ stdTTL: 25200, checkperiod: 1800 });

// User ID is stable and doesn't expire, so cache for 24 hours
// stdTTL: 86400 seconds (24 hours), checkperiod: 3600 seconds (1 hour)
const idamUserIdCache = new NodeCache({ stdTTL: 86400, checkperiod: 3600 });

@AllMethodsStep()
export default class IdamRequests extends BaseRequest {
  async getAccessToken({ name, email, password }: User): Promise<string> {
    console.log(`User logged in ${email}`);

    // Check cache first (aligned with CodeceptJS implementation)
    const cachedToken = idamTokenCache.get<string>(email);
    if (cachedToken != null) {
      console.log(`User access token coming from cache ${email}`);
      return cachedToken;
    }

    // Validate user details before fetching (aligned with CodeceptJS)
    if (!email || !password) {
      console.log('*******Missing user details. Cannot get access token******');
      throw new Error('Missing user email or password');
    }

    // Token not in cache, fetch from IDAM
    console.log(`user access token coming from idam ${email}`);
    const url = `${urls.idamApi}/loginUser`;
    const requestOptions: RequestOptions = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: { username: email, password: password },
      method: 'POST',
    };
    const responseJson = await super.retryRequestJson(url, requestOptions);
    const accessToken = responseJson.access_token;

    // Cache the token for future use
    idamTokenCache.set(email, accessToken);

    return accessToken;
  }

  async getUserId({ accessToken, email, name }: User): Promise<string> {
    // Check cache first (user ID is stable and doesn't expire)
    const cachedUserId = idamUserIdCache.get<string>(email);
    if (cachedUserId != null) {
      console.log(`User ID for user: ${name} retrieved from cache`);
      return cachedUserId;
    }

    // User ID not in cache, fetch from IDAM
    console.log(`Fetching User ID for user: ${name}`);
    const url = `${urls.idamApi}/o/userinfo`;
    const requestOptions: RequestOptions = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    };
    const responseJson = await super.retryRequestJson(url, requestOptions);
    const userId = responseJson.uid;

    // Cache the user ID for future use (user ID is stable, doesn't expire)
    idamUserIdCache.set(email, userId);
    console.log(`User ID for user: ${name} fetched from IDAM and cached`);

    return userId;
  }
}
