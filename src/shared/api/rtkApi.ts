import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const rtkAPI = createApi({
  reducerPath: 'API',
  baseQuery: fetchBaseQuery({}),
  endpoints: () => ({}),
});

export default rtkAPI;
