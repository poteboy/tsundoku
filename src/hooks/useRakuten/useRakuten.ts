import React, { useCallback } from 'react';
import { urls } from '@src/constants';
import {
  RakutenSearchResult,
  retrieveResponseFromResult,
  isBookInformationResponse,
  convertRespToBookInformation,
  BookInfo,
} from '@src/entities';

const BASE_URL = urls.endPoing.rakutenBook;
export const useRakuten = () => {
  const searchBookByTitle = useCallback(async (title: string) => {
    try {
      const url = `${BASE_URL}&title=${title}`;
      const res = await fetch(url);
      const json = (await res.json()) as RakutenSearchResult;
      const infos: BookInfo[] = retrieveResponseFromResult(json)
        .filter(isBookInformationResponse)
        .map(convertRespToBookInformation);
      return infos;
    } catch {
      throw new Error();
    }
  }, []);

  const searchBookByIsbn = useCallback(async (isbn: string) => {
    try {
      const url = `${BASE_URL}&isbn=${isbn}`;
      const res = await fetch(url);
      const json = (await res.json()) as RakutenSearchResult;
      const infos: BookInfo[] = retrieveResponseFromResult(json)
        .filter(isBookInformationResponse)
        .map(convertRespToBookInformation);
      console.log(infos);
      if (infos.length > 0) return infos[0];
      else throw new Error();
    } catch {
      throw new Error();
    }
  }, []);

  return { searchBookByTitle, searchBookByIsbn };
};
