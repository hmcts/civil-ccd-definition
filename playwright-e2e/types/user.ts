import UserRole from '../enums/user-role';
import UserKey from '../enums/user-key';

type User = {
  readonly email: string;
  readonly password: string;
  readonly role: UserRole;
  readonly key: UserKey;
  readonly cookiesPath?: string;
  userId?: string;
  accessToken?: string;
  orgId?: string;
};

export default User;
