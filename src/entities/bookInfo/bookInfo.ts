export type BookInfoResponse = {
  Item: {
    affiliateUrl: string;
    author: string;
    authorKana: string;
    availability: string;
    booksGenreId: string;
    isbn: string;
    itemCaption: string;
    itemPrice: number;
    itemUrl: string;
    largeImageUrl: string;
    mediumImageUrl: string;
    publisherName: string;
    reviewAverage: string; // '0.0
    reviewCount: number;
    salesDate: string;
    seriesName: string; //'新潮文庫'
    seriesNameKana: string;
    size: string; // '文庫';
    subTitle?: string;
    subTitleKana: string;
    title: string;
    titleKana: string;
  };
};

export type BookInfo = {
  uid: string; // isbn + bookGenreId 12文字
  author: string;
  itemUrl: string;
  isbn: string;
  imgUrl: string;
  caption?: string;
  publisher: string;
  publishedAt: string;
  size: string;
  title: string;
  subtitle?: string;
  reviewAverage?: string;
};

export const convertRespToBookInformation = (
  arg: BookInfoResponse,
): BookInfo => {
  const item = arg.Item;
  return {
    uid: item.isbn + '-' + item.booksGenreId.slice(0, 12),
    author: item.author,
    itemUrl: item.itemUrl,
    isbn: item.isbn,
    imgUrl: item.largeImageUrl ?? item.mediumImageUrl,
    caption: item.itemCaption,
    publisher: item.publisherName,
    publishedAt: item.salesDate,
    size: item.size,
    title: item.title,
    subtitle: item.subTitle,
    reviewAverage: item.reviewAverage,
  };
};

export const isBookInformationResponse = (
  arg: unknown,
): arg is BookInfoResponse => {
  if (!arg) return false;
  const resp = arg as BookInfoResponse;
  if (!resp.Item) return false;

  const item = resp.Item;

  try {
    return (
      !!item.isbn &&
      !!item.title &&
      !!item.author &&
      !!item.booksGenreId &&
      item.booksGenreId.length >= 12 &&
      (!!item.largeImageUrl || !!item.mediumImageUrl) &&
      !!item.publisherName &&
      !!item.itemUrl &&
      !!item.size &&
      !!item.salesDate
    );
  } catch {
    return false;
  }
};

export const isBookInfo = (arg: unknown): arg is BookInfo => {
  if (!arg) return false;
  const info = arg as BookInfo;
  try {
    return !!info.author && !!info.uid && !!info.isbn;
  } catch {
    return false;
  }
};

export type RakutenSearchResult = {
  GenreInformation: any[];
  Items: BookInfoResponse[];
};

export const retrieveResponseFromResult = (
  result: RakutenSearchResult,
): BookInfoResponse[] => {
  return result.Items.map(item => item);
};

export const mockBookInfo: BookInfo = {
  author: '筒井美希',
  caption:
    '「デザイン＝楽しい」を実感できる！デザイナーのあたまの中を豊富なビジュアルでひも解く。',
  imgUrl:
    'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/5174/9784844365174.jpg?_ex=200x200',
  isbn: '9784844365174',
  itemUrl: 'https://books.rakuten.co.jp/rb/13318064/',
  publishedAt: '2015年08月',
  publisher: 'エムディエヌコーポレーション',
  reviewAverage: '4.35',
  size: '単行本',
  subtitle: '目で見て楽しむデザインの本。',
  title: 'なるほどデザイン',
  uid: '9784844365174-001009009006',
};
