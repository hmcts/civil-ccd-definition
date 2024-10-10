import { test } from '../playwright-fixtures/index';
import filePaths from '../config/file-paths';
import FileType from '../enums/file-type';
import Cookie from '../types/cookie';
import FileSystemHelper from './file-system-helper';

export default class CookiesHelper {
  static async getCookies(filePath: string, isTeardown = false): Promise<Cookie[]> {
    try {
      return FileSystemHelper.readFile(filePath, FileType.JSON);
    } catch (error) {
      if (isTeardown) test.skip(error.message);
      else throw error;
    }
  }

  static async writeCookies(cookies: Cookie[], filePath: string) {
    await FileSystemHelper.writeFileAsync(cookies, filePath, FileType.JSON);
  }

  static deleteAllCookies() {
    FileSystemHelper.delete(`${filePaths.userCookies}/`);
  }
}
