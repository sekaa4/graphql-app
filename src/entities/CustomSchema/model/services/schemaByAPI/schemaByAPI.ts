import { createAsyncThunk } from '@reduxjs/toolkit';
import { buildClientSchema, getIntrospectionQuery, IntrospectionQuery, printSchema } from 'graphql';

export const schemaByAPI = createAsyncThunk<string | undefined, string>(
  'schemaByAPI',
  async (api, thunkAPI) => {
    try {
      const res = await fetch(api, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getIntrospectionQuery(),
          operationName: 'IntrospectionQuery',
        }),
      });

      if (!res.ok) {
        throw new Error('Invalid API Server');
      }

      const { data: introspection }: { data: IntrospectionQuery } = await res.json();

      return printSchema(buildClientSchema(introspection));
    } catch (e: unknown) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }

      throw e;
    }
  }
);
