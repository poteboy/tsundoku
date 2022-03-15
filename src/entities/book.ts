// google api からのレスポンス
export type BookResponse = {
  volumeInfo: {
    authors: string[];
    description: string;
    imageLinks: {
      smallThumbnai: string;
      thumbnail: string;
    };
    publishedDate: string;
    subtitle: string;
    title: string;
  };
};

export type Book = {
  uid: string;
  title: string;
  subtitle: string;
  publishedDate: string;
  thumbnail: string;
  description: string;
  authors: string[];
};

export const isBookResponse = (arg: unknown): arg is BookResponse => {
  if (!arg) return false;
  const res = arg as BookResponse;

  return (
    !!res.volumeInfo.authors &&
    !!res.volumeInfo.description &&
    !!res.volumeInfo.title &&
    !!res.volumeInfo.publishedDate
  );
};

export const convertRespToBook = (res: BookResponse, sibn: string): Book => {
  return {
    uid: sibn,
    title: res.volumeInfo.title,
    subtitle: res.volumeInfo.subtitle,
    publishedDate: res.volumeInfo.publishedDate,
    thumbnail: res.volumeInfo.imageLinks.thumbnail,
    description: res.volumeInfo.description,
    authors: res.volumeInfo.authors,
  };
};
