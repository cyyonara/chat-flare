import { IPaginationData } from './types';

export const parsePaginationData = (page: string, limit: string): IPaginationData => {
  const parsedPage =
    !page || isNaN(parseInt(page)) || parseInt(page) <= 0 ? 1 : parseInt(page);
  const parsedLimit =
    !limit || isNaN(parseInt(limit)) || parseInt(limit) <= 0 || parseInt(limit) > 30
      ? 10
      : parseInt(limit);
  return { parsedPage, parsedLimit };
};
