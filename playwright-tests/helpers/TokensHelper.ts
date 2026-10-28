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

// IDAM access tokens, S2S tokens and user IDs are saved to a file so they are reused across test runs (and worker
// restarts) until the tokens are close to expiring, instead of being fetched again for every API call
const tokenCacheFile = './playwright-tests/e2e/.auth/api-tokens.json';
const tokenValidityBufferSeconds = 60 * 60;
// AAT's IDAM rejects an access token about six hours after it was issued, although the token itself says it lasts for
// eight, so a saved token is not reused once it is this old
const tokenMaxAgeSeconds = 4 * 60 * 60;

// IDAM access tokens come from an OAuth2 password grant on IDAM's /o/token, as the CCD API gateway's client (IDAM's
// /loginUser is deprecated). The client secret is CCD_API_GATEWAY_IDAM_CLIENT_SECRET (in the env file; from the
// ccd-aat vault, ccd-api-gateway-oauth2-client-secret).
const idamClientId = 'ccd_gateway';
const idamScope = 'openid profile roles';

type TokenCache = Record<string, string>;

function readTokenCache(): TokenCache {
  try {
    return JSON.parse(fs.readFileSync(tokenCacheFile, 'utf-8'));
  } catch {
    return {};
  }
}

// Written to a temporary file and then renamed, so another worker never reads a half-written cache
function writeTokenCache(cache: TokenCache) {
  fs.mkdirSync(path.dirname(tokenCacheFile), { recursive: true });
  const tempFile = `${tokenCacheFile}.${process.pid}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(cache, null, 2));
  fs.renameSync(tempFile, tokenCacheFile);
}

function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString('utf-8'));
    const notExpiring = payload.exp * 1000 - Date.now() > tokenValidityBufferSeconds * 1000;
    const notTooOld = payload.iat === undefined || Date.now() - payload.iat * 1000 < tokenMaxAgeSeconds * 1000;
    return notExpiring && notTooOld;
  } catch {
    return false;
  }
}

// Tokens are only valid for the IDAM instance that issued them
const tokenCacheKey = (username: string) => `${idamApiBaseUrl}|${username}`;
// S2S tokens are only valid for the S2S service that issued them, and are for one microservice
const s2sCacheKey = () => `${authProviderApiBaseUrl}|s2s|${microService}`;
// A user's ID never changes, so it is kept for good once looked up
const userIdCacheKey = (username: string) => `${idamApiBaseUrl}|uid|${username}`;

// The user an IDAM access token belongs to (its subject, the user's email), or undefined if it cannot be read
function tokenSubject(token: string): string | undefined {
  try {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString('utf-8')).sub;
  } catch {
    return undefined;
  }
}


export class TokensHelper {
  private accessToken: string;
  private s2sToken: string;
  private uid: string;
  private eventToken: string;

  constructor() {
  }


  private async getTokenFromIdam(user) {
    const clientSecret = process.env.CCD_API_GATEWAY_IDAM_CLIENT_SECRET;
    if (!clientSecret) {
      throw new Error('CCD_API_GATEWAY_IDAM_CLIENT_SECRET is not set, so an IDAM access token cannot be fetched (add it to the env file)');
    }
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.post(`${idamApiBaseUrl}/o/token`, {
        headers: {
          Accept: "application/json",
        },
        form: {
          grant_type: 'password',
          client_id: idamClientId,
          client_secret: clientSecret,
          scope: idamScope,
          username: user.username,
          password: user.password,
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

    // The user's IDAM ID, from the cache when it has been looked up before
    async getUserId(accessToken) {
        const username = tokenSubject(accessToken);
        const cachedUid = username ? readTokenCache()[userIdCacheKey(username)] : undefined;
        if (cachedUid) {
            return cachedUid;
        }
        const uid = await this.getUserIdFromIdam(accessToken);
        if (username && uid) {
            writeTokenCache({ ...readTokenCache(), [userIdCacheKey(username)]: uid });
        }
        return uid;
    }

    private async getUserIdFromIdam(accessToken) {
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




    // An S2S token for civil_service, reused from the cache while it has more than an hour left (they last 4 hours)
    async getS2SToken() {
        const cachedToken = readTokenCache()[s2sCacheKey()];
        if (cachedToken && isTokenValid(cachedToken)) {
            console.log(`S2S token for ${microService} coming from saved file`);
            return cachedToken;
        }
        const s2sToken = await this.leaseS2SToken();
        // Re-read in case another worker saved a token in the meantime
        writeTokenCache({ ...readTokenCache(), [s2sCacheKey()]: s2sToken });
        console.log(`New S2S token leased for ${microService}`);
        return s2sToken;
    }

    private async leaseS2SToken() {
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
