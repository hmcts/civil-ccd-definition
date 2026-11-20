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
   * Checks whether a saved storage state file still holds a valid (non-expired) session.
   *
   * IDAM/XUI's auth cookie is a session cookie (`expires: -1` in the storage state file),
   * so browser-level cookie expiry can't be used. Instead this decodes the `exp` claim
   * from the cookie's JWT value.
   *
   * @param path {@link string} - path of the storage state file
   * @param cookieName {@link string} - name of the cookie holding the JWT access token
   * @param bufferSeconds {@link number} - minimum number of seconds the token must still have left to be considered valid
   *
   */
  public static isSessionValid(
    path: string,
    cookieName: string,
    bufferSeconds: number = 60 * 60
  ): boolean {
    // In the case the file doesn't exist, it should attempt to login
    if (!fs.existsSync(path)) return false;

    try {
      const data = JSON.parse(fs.readFileSync(path, "utf-8"));
      const cookie = data.cookies.find(
        (cookie: Cookie) => cookie.name === cookieName
      );
      if (!cookie) return false;

      const payload = cookie.value.split(".")[1];
      const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
      const expiryMs = decoded.exp * 1000;

      return expiryMs - Date.now() > bufferSeconds * 1000;
    } catch {
      // Any parsing failure means the cached session can't be trusted - force a fresh login
      return false;
    }
  }
}
