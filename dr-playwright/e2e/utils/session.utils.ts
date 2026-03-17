import { Cookie } from "@playwright/test";
import * as fs from "fs";

export class SessionUtils {
  constructor() {}

  /**
   * Returns JSON-parsed cookies from a given file
   *
   * @param filepath {@link string} - path of the cookie file
   *
   */
  public static getCookies(filepath: string) {
    const data = fs.readFileSync(filepath, "utf8");
    return JSON.parse(data).cookies;
  }

  /**
   * Opens a new browser context and returns the page
   *
   * @param path {@link string} - path of the session file
   * @param cookieName {@link string} - name of the cookie used for session validation
   *
   */
  public static isSessionValid(path: string, cookieName: string): boolean {
    // consider the cookie valid if there's at least 2 hours left on the session
    const expiryTime = 2 * 60 * 60 * 1000;

    // In the case the file doesn't exist, it should attempt to login
    if (!fs.existsSync(path)) return false;

    try {
      const data = JSON.parse(fs.readFileSync(path, "utf-8"));
      const cookie = data.cookies.find(
        (cookie: Cookie) => cookie.name === cookieName
      );
      const expiry = new Date(cookie.expires * 1000);
      return expiry.getTime() - Date.now() > expiryTime;
    } catch (error) {
      throw new Error(`Could not read session data: ${error} for ${path}`);
    }
  }
}
