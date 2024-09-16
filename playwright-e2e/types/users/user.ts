import UserRole from "../../enums/user-role";
import UserType from "../../enums/user-type";

type User = {
  readonly email: string;
  readonly password: string;
  readonly role: UserRole;
  readonly type: UserType;
  readonly cookiesPath?: string;
  userId?: string;
  accessToken?: string;
};

export default User;
