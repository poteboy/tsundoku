export type BookInformationResponse = {
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

export type BookInformation = {
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
  arg: BookInformationResponse,
): BookInformation => {
  const item = arg.Item;

  return {
    uid: item.isbn + '-' + item.booksGenreId.slice(0, 12),
    author: item.author,
    itemUrl: item.affiliateUrl ?? item.itemUrl,
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
): arg is BookInformationResponse => {
  if (!arg) return false;
  const resp = arg as BookInformationResponse;
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

export type RakutenSearchResult = {
  GenreInformation: any[];
  Items: BookInformationResponse[];
};

export const retrieveResponseFromResult = (
  result: RakutenSearchResult,
): BookInformationResponse[] => {
  return result.Items.map(item => item);
};
