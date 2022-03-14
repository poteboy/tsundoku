import { Model, isModel } from './model';

export interface User extends Model {
  name: string;
  authUid: string;
}

export const isUser = (arg: unknown): arg is User => {
  if (!isModel(arg)) return false;
  const _user = arg as User;
  return !!_user.name && !!_user.authUid;
};
