export interface IPaginationResponse<T = unknown> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  nextPage: number;
  prevPage: number;
}

export interface IPaginationParams {
  page: number;
  limit: number;
}

export interface ITokenPaginationParams {
  network: string;
  page: number;
  limit: number;
}
