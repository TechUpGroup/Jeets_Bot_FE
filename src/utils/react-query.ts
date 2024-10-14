import { cloneDeep } from 'lodash';

import { IPaginationResponse } from '@/types/api.type';

export const pushDataToFirstPage = (
  data: IPaginationResponse<any> | undefined,
  dataLatest: any,
  { isNotSlice, isReplace }: { isNotSlice?: boolean; isReplace?: boolean } = { isNotSlice: false, isReplace: false },
) => {
  if (!data || data.page !== 1) return data;
  const indexFinded = data.docs.findIndex((e) => e._id === dataLatest._id);
  if (indexFinded >= 0 && !isReplace) return data;
  const cloneDocs = cloneDeep(data.docs);
  if (indexFinded >= 0) {
    cloneDocs.splice(indexFinded, 1);
  }
  cloneDocs.unshift(dataLatest);
  const totalPages = data.totalPages === 1 && cloneDocs.length > data.limit ? 2 : data.totalPages;
  const hasNextPage = totalPages > 1 ? true : data.hasNextPage;
  return {
    ...data,
    docs: !isNotSlice ? cloneDocs : cloneDocs.slice(0, data.limit),
    totalPages,
    hasNextPage,
  };
};
