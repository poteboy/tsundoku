import { Model } from '@src/entities';
import { DocumentReference } from '@src/constants';

export interface Review extends Model {
  userRef: DocumentReference;
  star?: 1 | 2 | 3 | 4 | 5;
  review?: string;
}

export const isReview = (arg: unknown): arg is Review => {
  if (!arg) return false;
  const data = arg as Review;
  try {
    return !!data.uid && !!data.userRef;
  } catch {
    return false;
  }
};
