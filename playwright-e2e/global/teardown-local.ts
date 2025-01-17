import AxeCacheHelper from '../helpers/axe-cache-helper';
import BankHolidaysHelper from '../helpers/bank-holidays-helper';
import CookiesHelper from '../helpers/cookies-helper';
import UserStateHelper from '../helpers/users-state-helper';

const globalTeardown = async () => {
  UserStateHelper.deleteAllUsersState();
  CookiesHelper.deleteAllCookies();
  AxeCacheHelper.deleteAllCache();
  BankHolidaysHelper.deleteBankHolidays();
};

export default globalTeardown;
