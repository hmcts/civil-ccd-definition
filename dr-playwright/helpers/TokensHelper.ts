import { APIRequestContext, request }  from "@playwright/test";
import {
  idamApiBaseUrl,
  authProviderApiBaseUrl,
  microService,
  secret,
  ccdDataStoreApiBaseUrl, createCase,
} from '../civilConfig.ts';
import {TOTP} from 'totp-generator';


import fs from 'fs';
import path from 'path';

// IDAM access tokens are saved to a file so they are reused across test runs (and worker restarts)
// until they are close to expiring, instead of fetching a new one from IDAM on every run
const tokenCacheFile = './dr-playwright/e2e/.auth/api-tokens.json';
const tokenValidityBufferSeconds = 60 * 60;

type TokenCache = Record<string, string>;

function readTokenCache(): TokenCache {
  try {
    return JSON.parse(fs.readFileSync(tokenCacheFile, 'utf-8'));
  } catch {
    return {};
  }
}

function writeTokenCache(cache: TokenCache) {
  fs.mkdirSync(path.dirname(tokenCacheFile), { recursive: true });
  fs.writeFileSync(tokenCacheFile, JSON.stringify(cache, null, 2));
}

function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString('utf-8'));
    return payload.exp * 1000 - Date.now() > tokenValidityBufferSeconds * 1000;
  } catch {
    return false;
  }
}

// Tokens are only valid for the IDAM instance that issued them
const tokenCacheKey = (username: string) => `${idamApiBaseUrl}|${username}`;


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
        const cache = readTokenCache();
        const cachedToken = cache[tokenCacheKey(user.username)];
        if (cachedToken && isTokenValid(cachedToken)) {
            console.log('User access token coming from saved file', user.username);
            return cachedToken;
        }

        if (user.username && user.password) {
            const accessToken = await this.getTokenFromIdam(user);
            // Re-read in case another worker saved a token in the meantime
            writeTokenCache({ ...readTokenCache(), [tokenCacheKey(user.username)]: accessToken });
            console.log('User logged in to IDAM for a new access token', user.username);
            return accessToken;
        } else {
            console.log('*******Missing user details. Cannot get access token******');
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

      return {
        accessToken: this.accessToken,
        s2sToken: this.s2sToken,
        uid: this.uid
      }
  }
}
