// firestoreのPATH

export const collectionPath = {
  users: {
    users: 'users',
    books: {
      books: 'books',
    },
  },
  bookInfos: {
    bookInfos: 'bookInfos',
  },
  reviews: {
    reviews: 'reviews',
  },
} as const;
