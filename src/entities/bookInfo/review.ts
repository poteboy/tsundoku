import { Model } from '@src/entities';
import { DocumentReference } from 'firebase/app/dist/firestore';

export interface Review extends Model {
  userRef: DocumentReference;
  star: 1 | 2 | 3 | 4 | 5;
  review: string;
}
