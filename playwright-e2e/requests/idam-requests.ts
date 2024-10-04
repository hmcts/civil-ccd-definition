import BaseRequest from '../base/base-requests';
import urls from '../config/urls';
import { AllMethodsStep } from '../decorators/test-steps';
import IdamUser from '../types/idam-user';
import RequestOptions from '../types/request-options';
import User from '../types/user';

@AllMethodsStep()
export default class IdamRequests extends BaseRequest {
  async createCitizenUser({ email, password, role }: User): Promise<IdamUser> {
    console.log(`Creating user with email: ${email}`);
    const url = `${urls.idamApi}/testing-support/accounts`;
    const requestOptions: RequestOptions = {
      method: 'POST',
      body: {
        email: email,
        password: password,
        forename: 'John',
        surname: 'Smith',
        roles: [{ code: role.toString() }],
      },
    };
    const response = await this.request(url, requestOptions, 201);
    console.log(`User with email: ${email} successfully created`);
    return await response.json();
  }

  async deleteUser({ email }: User): Promise<void> {
    console.log(`Delete user: ${email}`);
    const url = `${urls.idamApi}/testing-support/accounts/${email}`;
    const requestOptions: RequestOptions = {
      method: 'DELETE',
    };
    try {
      await this.request(url, requestOptions, 204);
      console.log(`User: ${email} successfully deleted`);
    } catch (error) {
      console.log(`error deleting user: ${email}` + error);
    }
  }

  async getAccessToken({ email, password }: User): Promise<string> {
    console.log(`Fetching access token for user: ${email}...`);
    const url = `${urls.idamApi}/loginUser`;
    const requestOptions: RequestOptions = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: { username: email, password: password },
      method: 'POST',
    };
    const response = await super.retriedRequest(url, requestOptions);
    const json = await response.json();
    console.log(`Access token for user: ${email} fetched successfully`);
    return json.access_token;
  }

  async getUserId({ accessToken, email }: User): Promise<string> {
    console.log(`Fetching User ID for user: ${email}`);
    const url = `${urls.idamApi}/o/userinfo`;
    const requestOptions: RequestOptions = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    };
    const response = await super.retriedRequest(url, requestOptions);
    const json = await response.json();
    console.log(`User ID for user: ${email} fetched successfully`);
    return json.uid;
  }

  async getSecurityPin(letterHolderId: string) {
    console.log('Fetching security pin for claim...');
    const url = `${urls.idamApi}/testing-support/accounts/pin/${letterHolderId}`;
    const requestOptions: RequestOptions = {
      method: 'GET',
    };
    const response = await super.retriedRequest(url, requestOptions);
    const pin = await response.text();
    console.log(`Security pin: ${pin} fetched successfully`);
    return pin;
  }
}
