import { APIRequestContext, request } from "@playwright/test";

export interface IdamTokenParams {
  grantType: string;
  clientId: string;
  clientSecret: string;
  scope: string;
  username?: string;
  password?: string;
  redirectUri?: string;
}

export interface CreateUserParams {
  bearerToken: string;
  password: string;
  user: {
    id?: string;
    email: string;
    forename: string;
    surname: string;
    roleNames: string[];
  };
}

export interface CreatedUser {
  id: string;
  email: string;
  password: string;
  forename: string;
  surname: string;
}

export type GetUserInfoParams =
  | { email: string; id?: never; bearerToken: string }
  | { id: string; email?: never; bearerToken: string };

export interface UserInfoParams {
  id?: string;
  email: string;
  forename: string;
  surname: string;
  displayName: string;
  roleNames: string[];
}

/**
 * Utility class to interact with HMCTS IDAM APIs.
 * Provides methods to generate bearer tokens and create test users.
 */
export class IdamUtils {
  private readonly idamWebUrl: string;
  private readonly idamTestingSupportUrl: string;

  constructor() {
    this.idamWebUrl = process.env.IDAM_WEB_URL ?? "";
    this.idamTestingSupportUrl = process.env.IDAM_TESTING_SUPPORT_URL ?? "";

    if (!this.idamWebUrl || !this.idamTestingSupportUrl) {
      throw new Error(
        "Missing required environment variables: IDAM_WEB_URL and/or IDAM_TESTING_SUPPORT_URL"
      );
    }
  }

  private async createApiContext(): Promise<APIRequestContext> {
    return await request.newContext();
  }

  /**
   * Generates an IDAM bearer token.
   * Should be called once at the beginning of a test run (for example in global.setup.ts).
   * Token valid for up to 8 hours.
   *
   * @param payload {@link IdamTokenParams} - The form data required to generate the token.
   */
  public async generateIdamToken(payload: IdamTokenParams): Promise<string> {
    const url = `${this.idamWebUrl}/o/token`;

    const data: Record<string, string> = {
      grant_type: payload.grantType,
      client_id: payload.clientId,
      client_secret: payload.clientSecret,
      scope: payload.scope,
      username: payload.username ?? "",
      password: payload.password ?? "",
      redirectUri: payload.redirectUri ?? "",
    };

    const apiContext = await this.createApiContext();

    try {
      const response = await apiContext.post(url, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
        form: data,
      });

      if (!response.ok()) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch access token: ${response.status()} - ${errorText}.`
        );
      }

      const json = await response.json();
      return json.access_token;
    } catch (error) {
      throw new Error(
        `Error while fetching token: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Creates a test user in IDAM with specified roles.
   *
   * @param payload {@link CreateUserParams} - The payload required to create the user.
   */
  public async createUser(payload: CreateUserParams): Promise<CreatedUser> {
    const url = `${this.idamTestingSupportUrl}/test/idam/users`;
    const apiContext = await this.createApiContext();

    const response = await apiContext.post(url, {
      headers: {
        Authorization: `Bearer ${payload.bearerToken}`,
        "Content-Type": "application/json",
      },
      data: {
        password: payload.password,
        user: {
          id: payload.user.id,
          email: payload.user.email,
          forename: payload.user.forename,
          surname: payload.user.surname,
          roleNames: payload.user.roleNames,
        },
      },
    });
    const json = await response.json();
    if (response.status() === 201) {
      return {
        id: json.id,
        email: payload.user.email,
        password: payload.password,
        forename: payload.user.forename,
        surname: payload.user.surname,
      };
    }

    throw new Error(
      `Failed to create user: ${await response.text()} (Status Code: ${response.status()})`
    );
  }

  /**
   * Gets user info based on user email OR id provided.
   *
   * @param payload {@link GetUserInfoParams} - The payload required to get user information.
   */
  public async getUserInfo(
    payload: GetUserInfoParams
  ): Promise<UserInfoParams> {
    let url: string;
    if ((payload.email && payload.id) || (!payload.email && !payload.id)) {
      throw new Error(
        "You must provide either an email or an id, but not both."
      );
    }
    if (payload.email) {
      url = `${
        this.idamTestingSupportUrl
      }/test/idam/users?email=${encodeURIComponent(payload.email)}`;
    } else {
      url = `${this.idamTestingSupportUrl}/test/idam/users/${payload.id}`;
    }

    const apiContext = await this.createApiContext();
    const response = await apiContext.get(url, {
      headers: {
        Authorization: `Bearer ${payload.bearerToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok()) {
      throw new Error(
        `Failed to fetch user info: ${await response.text()} (Status Code: ${response.status()})`
      );
    }

    const json = await response.json();
    return {
      id: json.id,
      email: json.email,
      forename: json.forename,
      surname: json.surname,
      displayName: json.displayName,
      roleNames: json.roleNames,
    };
  }
}
