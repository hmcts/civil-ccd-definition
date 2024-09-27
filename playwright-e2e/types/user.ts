import UserRole from '../enums/user-role';
import UserKey from '../enums/user-key';

type User = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: UserRole;
  readonly key: UserKey;
  readonly orgId?: string;
  readonly cookiesPath?: string;
  workerIndex?: number;
  userId?: string;
  accessToken?: string;
};

export default User;
