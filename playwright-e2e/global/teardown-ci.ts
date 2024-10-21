import AxeCacheHelper from '../helpers/axe-cache-helper';
import CookiesHelper from '../helpers/cookies-helper';
import UserStateHelper from '../helpers/users-state-helper';

const globalTeardownCI = () => {
  UserStateHelper.deleteAllUsersState();
  CookiesHelper.deleteAllCookies();
  AxeCacheHelper.deleteAllCache();
};

globalTeardownCI();
