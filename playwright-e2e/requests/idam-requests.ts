import BaseRequest from '../base/base-request';
import urls from '../config/urls';
import { AllMethodsStep } from '../decorators/test-steps';
import RequestOptions from '../models/api/request-options';
import IdamUser from '../models/users/idam-user';
import User from '../models/users/user';

@AllMethodsStep()
export default class IdamRequests extends BaseRequest {
   private async getRequestHeaders({ accessToken }: User) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
  }

  async createCitizenUser(citizenUser: User, exuiUser: User): Promise<IdamUser> {
    console.log(`Creating user with email: ${citizenUser.email}`);
    const url = `${urls.idamTestSupportApi}/test/idam/users`;
    const requestOptions: RequestOptions = {
      method: 'POST',
      headers: await this.getRequestHeaders(exuiUser),
      body: {
        password: citizenUser.password,
        user: {
          email: citizenUser.email,
          forename: citizenUser.key,
          surname: citizenUser.role,
          displayName: citizenUser.name,
          roleNames: [citizenUser.role.toString()],
        }
      },
    };
    const responseJson = await super.requestJson(url, requestOptions, {
      expectedStatus: [201, 409],
    });
    console.log(`User with email: ${citizenUser.email} successfully created`);
    return await responseJson;
  }

  async deleteUser({ email }: User, exuiUser: User): Promise<void> {
    console.log(`Delete user: ${email}`);
    const url = `${urls.idamTestSupportApi}/test/idam/users/${email}`;
    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(exuiUser),
      method: 'DELETE',
    };
    try {
      await this.request(url, requestOptions, { expectedStatus: 204 });
      console.log(`User: ${email} successfully deleted`);
    } catch (error) {
      console.log(`error deleting user: ${email}` + error);
    }
  }

  async getAccessToken({ name, email, password }: User): Promise<string> {
    console.log(`Fetching access token for user: ${name}...`);
    const url = `${urls.idamApi}/loginUser`;
    const requestOptions: RequestOptions = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: { username: email, password: password },
      method: 'POST',
    };
    const responseJson = await super.retryRequestJson(url, requestOptions);
    console.log(`Access token for user: ${name} fetched successfully`);
    return responseJson.access_token;
  }

  async getUserId({ accessToken, email, name }: User): Promise<string> {
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
    console.log(`User ID for user: ${name} fetched successfully`);
    return responseJson.uid;
  }
}
