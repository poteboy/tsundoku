import { Model } from '@src/entities';

export interface Review extends Model {
  userRef: any;
  star: 1 | 2 | 3 | 4 | 5;
  review: string;
}
