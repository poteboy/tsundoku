// firestoreのPATH

export const collections = {
  users: {
    users: 'users',
    books: {
      books: 'books',
    },
  },
  bookInfos: {
    bookInfos: 'bookInfos',
    reviews: {
      reviews: 'reviews',
    },
  },
} as const;
