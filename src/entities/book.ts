// google api からのレスポンス
export type BookResponse = {
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

export type Book = {
  uid: string;
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
      !!res.volumeInfo.authors &&
      !!res.volumeInfo.title &&
      !!res.volumeInfo.publishedDate &&
      !!res.volumeInfo.pageCount &&
      !!res.volumeInfo.industryIdentifiers &&
      res.volumeInfo.industryIdentifiers.some(v => v.type === 'ISBN_13')
    );
  } catch {
    return false;
  }
};

export const convertRespToBook = (res: BookResponse): Book => {
  const uid = res.volumeInfo.industryIdentifiers.find(
    v => v.type === 'ISBN_13',
  )?.identifier;
  return {
    uid: uid!,
    title: res.volumeInfo.title,
    subtitle: res.volumeInfo.subtitle,
    publishedDate: res.volumeInfo.publishedDate,
    thumbnail: res.volumeInfo.imageLinks?.thumbnail,
    description: res.volumeInfo.description,
    authors: res.volumeInfo.authors,
    pageCount: res.volumeInfo.pageCount,
  };
};

export const mockBook: Book = {
  uid: '9784844365174',
  title: 'なるほどデザイン',
  subtitle: '目で見て楽しむデザインの本。',
  publishedDate: '2015-08-01',
  thumbnail:
    'http://books.google.com/books/content?id=cdZzzgEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
  description:
    '「デザイン=楽しい」を実感できる!デザイナーのあたまの中を豊富なビジュアルでひも解く。',
  authors: ['筒井美希'],
  pageCount: 256,
};
