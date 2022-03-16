// google api からのレスポンス
export type BookResponse = {
  id: string;
  volumeInfo: {
    authors: string[];
    description?: string;
    imageLinks?: {
      smallThumbnai: string;
      thumbnail: string;
    };
    publishedDate: string;
    subtitle: string;
    title: string;
    pageCount: number;
    industryIdentifiers: {
      identifier: string;
      type: 'ISBN_13' | 'ISBN_10';
    }[];
  };
};

// ISBNは重複があるので、UIDをID+ISBNで表す
export type BookInfo = {
  uid: string;
  isbn: string;
  title: string;
  subtitle?: string;
  publishedDate: string;
  thumbnail?: string;
  description?: string;
  authors: string[];
  pageCount: number;
};

export const isBookResponse = (arg: unknown): arg is BookResponse => {
  if (!arg) return false;
  const res = arg as BookResponse;

  try {
    return (
      !!res.id &&
      !!res.volumeInfo.authors &&
      !!res.volumeInfo.title &&
      !!res.volumeInfo.imageLinks?.thumbnail &&
      !!res.volumeInfo.publishedDate &&
      !!res.volumeInfo.pageCount &&
      !!res.volumeInfo.industryIdentifiers &&
      res.volumeInfo.industryIdentifiers.some(
        v => v.type === 'ISBN_13' && !!v.identifier,
      )
    );
  } catch {
    return false;
  }
};

export const convertRespToBook = (res: BookResponse): BookInfo => {
  const isbn = res.volumeInfo.industryIdentifiers.find(
    v => v.type === 'ISBN_13',
  )?.identifier as string;
  return {
    uid: `${res.id}-${isbn}`,
    isbn: isbn,
    title: res.volumeInfo.title,
    subtitle: res.volumeInfo.subtitle,
    publishedDate: res.volumeInfo.publishedDate,
    thumbnail: res.volumeInfo.imageLinks?.thumbnail,
    description: res.volumeInfo.description,
    authors: res.volumeInfo.authors,
    pageCount: res.volumeInfo.pageCount,
  };
};

export const mockBookInfo: BookInfo = {
  uid: 'cdZzzgEACAAJ-9784873119496',
  isbn: '9784873119496',
  title: 'UXデザインの法則',
  subtitle: '最高のプロダクトとサービスを支える心理学',
  publishedDate: '2021-05',
  thumbnail:
    'http://books.google.com/books/content?id=cdZzzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
  description:
    'UXデザインにおける心理的法則と事例を、10通りに絞り解説。ノンデザイナーにもセンスが求められる時代のハンドブック。',
  authors: ['ジョンヤブロンスキ'],
  pageCount: 160,
};
