import { Model, isModel } from '../model';

export interface User extends Model {
  authUid: string;
  // profile: Profile;
  premium: boolean;
}

type Profile = {
  name: string;
  avator: string;
};

export const isUser = (arg: unknown): arg is User => {
  if (!isModel(arg)) return false;
  const _user = arg as User;
  // return !!_user.profile && !!_user.authUid;
  return !!_user.authUid;
};
