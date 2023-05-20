import rtkAPI from '@/shared/api/rtkApi';

import { RequestObj } from '../types/RequestObj.type';

const graphQlDataByAnyAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchGraphQlDataByAnyAPI: build.mutation<Record<string, string>, RequestObj>({
      query: ({ url, request, variables = {} }) => ({
        url,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: request,
          variables,
        }),
      }),
      transformErrorResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const fetchGraphQlDataByAnyAPI = graphQlDataByAnyAPI.useFetchGraphQlDataByAnyAPIMutation;
