import { APIRequestContext, request } from "@playwright/test";

export interface ServiceTokenParams {
  microservice: string;
}

export class ServiceAuthUtils {
  private readonly serviceAuthUrl: string;
  constructor() {
    this.serviceAuthUrl = process.env.S2S_URL ?? "";

    if (!this.serviceAuthUrl) {
      throw new Error("Missing required environment variables: S2S_URL");
    }
  }
  /**
   * Retrieves a Service Auth token.
   *
   * @param payload {@link ServiceTokenParams} - The form data required to retrieve the token.
   */
  private async createApiContext(): Promise<APIRequestContext> {
    return await request.newContext();
  }

  public async retrieveToken(payload: ServiceTokenParams): Promise<string> {
    const apiContext = await this.createApiContext();

    try {
      const response = await apiContext.post(this.serviceAuthUrl, {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        data: {
          microservice: payload.microservice,
        },
      });

      if (!response.ok()) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch S2S token: ${response.status()} - ${errorText}. Ensure your VPN is connected or check your URL/SECRET.`
        );
      }

      return response.text();
    } catch (error) {
      throw new Error(
        `An error occurred while fetching the access token: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  }
}
