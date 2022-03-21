export type Model = {
  uid: string;
  createdAt: Date | TimeStamp;
  active: Active;
};

export type TimeStamp = {
  nanoseconds: number;
  seconds: number;
};

export enum Active {
  Deleted = 'Deleted', // 論理削除
  Deactivated = 'Deactivated',
  Activated = 'Active', // アクティブ
  Completed = 'Completed', // イベント等で終了したもの
}

export const isModel = (arg: unknown): arg is Model => {
  if (!arg) return false;
  const model = arg as Model;
  return (
    !!model.uid &&
    typeof model.uid === 'string' &&
    !!model.createdAt &&
    !!model.active
  );
};

export const mockTimeStamp: TimeStamp = {
  nanoseconds: 744000000,
  seconds: 1647883850,
};
