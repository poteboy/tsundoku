import { RAKUTEN_APPLICATION_ID, RAKUTEN_AFFILIATE_ID } from '@env';

export const urls = {
  endPoing: {
    googleBook: 'https://www.googleapis.com/books/v1/volumes?q=',
    rakutenBook: `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?applicationId=${RAKUTEN_APPLICATION_ID}&affiliateId=${RAKUTEN_AFFILIATE_ID}`,
  },
  twitter: 'https://twitter.com/_poteboy_',
  appList: 'https://apps.apple.com/jp/developer/keita-furuse/id1585741819',
};
