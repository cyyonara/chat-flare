import { IPaginationData, IPaginationResponse } from './types';

export const parsePaginationData = (page: string, limit: string): IPaginationData => {
   const parsedPage =
      !page || isNaN(parseInt(page)) || parseInt(page) <= 0 ? 1 : parseInt(page);
   const parsedLimit =
      !limit || isNaN(parseInt(limit)) || parseInt(limit) <= 0 || parseInt(limit) > 30
         ? 10
         : parseInt(limit);
   return { parsedPage, parsedLimit };
};

export const getPaginationResponse = (
   count: number,
   limit: number,
   currentPage: number
): IPaginationResponse => {
   const totalPages = Math.ceil(count / limit);
   const hasNextPage = currentPage < totalPages;
   const nextPage = hasNextPage ? currentPage + 1 : null;

   return { totalPages, hasNextPage, nextPage };
};
