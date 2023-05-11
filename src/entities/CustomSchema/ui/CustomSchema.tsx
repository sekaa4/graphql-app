import { useEffect } from 'react';

import { fetchSchemaByAPI } from '../api/shemaByAnyAPI';

const GRAPHQL_END_POINT_SCHEMA = 'https://rickandmortyapi.com/graphql';

export const CustomSchema = () => {
  const [getSchemaByAPI, { isLoading, data: currentSchema, error }] = fetchSchemaByAPI();

  useEffect(() => {
    getSchemaByAPI(GRAPHQL_END_POINT_SCHEMA);
  }, [getSchemaByAPI]);

  return <div>{currentSchema ? currentSchema : 'loading...'}</div>;
};
