import { buildClientSchema, getIntrospectionQuery, IntrospectionQuery, printSchema } from 'graphql';

import rtkAPI from '@/shared/api/rtkApi';

const schemaByAnyAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchSchemaByAPI: build.mutation<string, string>({
      query: (url) => ({
        url,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getIntrospectionQuery(),
          operationName: 'IntrospectionQuery',
        }),
      }),
      transformResponse: (response: { data: IntrospectionQuery }) => {
        const { data: introspection } = response;

        const schemaSDL = printSchema(buildClientSchema(introspection));

        return schemaSDL;
      },
    }),
  }),
});

export const fetchSchemaByAPI = schemaByAnyAPI.useFetchSchemaByAPIMutation;
