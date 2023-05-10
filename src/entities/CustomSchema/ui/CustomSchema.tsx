import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks';

import { getGraphQlSchemaValue } from '../model/selectors/getGraphQlSchemaValue/getGraphQlSchemaValue';
import { schemaByAPI } from '../model/services/schemaByAPI/schemaByAPI';

const GRAPHQL_END_POINT_SCHEMA = 'https://rickandmortyapi.com/graphql';

export const CustomSchema = () => {
  const dispatch = useAppDispatch();
  const currentSchema = useSelector(getGraphQlSchemaValue);

  useEffect(() => {
    dispatch(schemaByAPI(GRAPHQL_END_POINT_SCHEMA));
  }, [dispatch]);

  return <div>{currentSchema ? currentSchema : 'loading...'}</div>;
};
