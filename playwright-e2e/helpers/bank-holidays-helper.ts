import { bankHolidays } from '../config/data';
import filePaths from '../config/file-paths';
import FileType from '../enums/file-type';
import FileSystemHelper from './file-system-helper';

export default class BankHolidaysHelper {
  static getBankHolidaysFromState = (): string[] | null => {
    try {
      const bankHolidays = FileSystemHelper.readFile(filePaths.bankHolidaysJson, FileType.JSON);
      return bankHolidays;
    } catch {
      return null;
    }
  };

  static writeBankHolidays() {
    FileSystemHelper.writeFile(bankHolidays, filePaths.bankHolidaysJson, FileType.JSON);
  }

  static deleteBankHolidays() {
    FileSystemHelper.delete(filePaths.bankHolidaysJson);
  }
}
