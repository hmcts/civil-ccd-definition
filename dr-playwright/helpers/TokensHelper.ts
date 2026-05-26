import { APIRequestContext, request }  from "@playwright/test";
import {
  idamApiBaseUrl,
  authProviderApiBaseUrl,
  microService,
  secret,
  ccdDataStoreApiBaseUrl, createCase,
} from '../civilConfig.ts';
import {TOTP} from 'totp-generator';


import NodeCache from 'node-cache';
//Idam access token expires for every 8 hrs
const accessTokenCache = new NodeCache({ stdTTL: 25200, checkperiod: 1800 });


export class TokensHelper {
  private accessToken: string;
  private s2sToken: string;
  private uid: string;
  private eventToken: string;

  constructor() {
  }

  private async getTokenFromIdam(user) {
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.post(`${idamApiBaseUrl}/loginUser?username=${encodeURIComponent(user.username)}&password=${user.password}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      if (!response.ok()) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch access token: ${response.status()} - ${errorText}. Ensure your VPN is connected or check your URL/SECRET.`
                )
            }
            return (await response.json()).access_token;
        } catch (error) {
            throw new Error(
                `An error occurred while fetching the access token: ${
                    error instanceof Error ? error.message : error }`
            );
        };
    }

    async getAccessToken(user) {
        console.log('User logged in', user.username);
        if (accessTokenCache.get(user.username) != null) {
            console.log('User access token coming from cache', user.username);
        return accessTokenCache.get(user.username);
        } else {
            if (user.username && user.password) {
                const accessToken = await this.getTokenFromIdam(user);
                accessTokenCache.set(user.username, accessToken);
                console.log('user access token coming from idam', user.username);
                return accessToken;
            } else {
                console.log('*******Missing user details. Cannot get access token******');
            }
        }
    }

    async getUserId(accessToken) {
        const url: string = `${idamApiBaseUrl}/o/userinfo`;
        const apiRequestContext: APIRequestContext = await request.newContext();
        try {
            const response = await apiRequestContext.post(url, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            );

            if (!response.ok()) {
                const errorText = await response.text();
                throw new Error(
                    `Failed to fetch uid: ${response.status()} - ${errorText}. Ensure your VPN is connected or check your URL/SECRET.`
                );
            }
            return (await response.json()).uid;
        } catch (error) {
            throw new Error(
                `An error occurred while fetching the uid: ${
                    error instanceof Error ? error.message : error
                }`
            );
        };
    }




    async getS2SToken() {
        const url: string = `${authProviderApiBaseUrl}/testing-support/lease`;
        const apiRequestContext: APIRequestContext = await request.newContext();
        try {
            const response = await apiRequestContext.post(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                    },
                data:{
                        microservice: microService,
                        oneTimePassword: TOTP.generate(secret)
                    }
                }
            );

            if (!response.ok()) {
                const errorText = await response.text();
                throw new Error(
                    `Failed to fetch S2S token: ${response.status()} - ${errorText}. Ensure your VPN is connected or check your URL/SECRET.`
                );
            }
            return (await response.text());
        } catch (error) {
            throw new Error(
                `An error occurred while fetching the S2S token: ${
                    error instanceof Error ? error.message : error
                }`
            );
        };
    }


    async getEventToken(event:string, caseId: string, uid: string, accessToken: string, s2sToken: string) {

        let url: string;
        if (caseId) {
            url = `${ccdDataStoreApiBaseUrl}/caseworkers/${uid}/jurisdictions/${createCase.jurisdictionCode}/case-types/${createCase.caseTypeCode}/cases/${caseId}/event-triggers/${event}/token`;
        } else {
            url = `${ccdDataStoreApiBaseUrl}/caseworkers/${uid}/jurisdictions/${createCase.jurisdictionCode}/case-types/${createCase.caseTypeCode}/event-triggers/${event}/token`;
        }

        const apiRequestContext: APIRequestContext = await request.newContext();

        try {
            const response = await apiRequestContext.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                        Authorization: `Bearer ${accessToken}`,
                        ServiceAuthorization: `${s2sToken}`
                    },
                }
            );

            if (!response.ok()) {
                const errorText = await response.text();
                throw new Error(
                    `Failed to fetch Event token: ${response.status()} - ${errorText}. Ensure your VPN is connected or check your URL/SECRET.`
                );
            }
            console.log('Getting token for event: ' + event);
            return (await response.json()).token;
        } catch (error) {
            throw new Error(
                `An error occurred while fetching the Event token: ${
                    error instanceof Error ? error.message : error
                }`
            );
        };
    }

    async getNonEventTokens(user){
      this.accessToken = await this.getAccessToken(user);
      this.s2sToken = await this.getS2SToken()
      this.uid = await this.getUserId(this.accessToken);
  }
}
