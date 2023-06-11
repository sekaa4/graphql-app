/* eslint-disable no-console */
import { buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql';

const GRAPHQL_END_POINT_SCHEMA = 'https://rickandmortyapi.com/graphql';

export async function fetchSchema() {
  try {
    const res = await fetch(GRAPHQL_END_POINT_SCHEMA, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: getIntrospectionQuery(), operationName: 'IntrospectionQuery' }),
    });
    const { data: introspection } = await res.json();

    return printSchema(buildClientSchema(introspection));
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`fetchSchema ${e.message}`);
    }
  }
}
