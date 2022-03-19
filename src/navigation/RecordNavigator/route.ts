import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export const RecordKeys = {
  Record: 'Record/Home',
} as const;

export type RecordParamList = {
  [RecordKeys.Record]: undefined;
};

export const useRecordNavigation = () =>
  useNavigation<NativeStackNavigationProp<RecordParamList>>();
