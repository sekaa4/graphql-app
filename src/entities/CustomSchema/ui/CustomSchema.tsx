import { useSelector } from 'react-redux';

import { getGraphQlSchemaValue } from '../model/selectors/getGraphQlSchemaValue/getGraphQlSchemaValue';

export const CustomSchema = () => {
  const currentSchema = useSelector(getGraphQlSchemaValue);

  return <div>{currentSchema ? currentSchema : 'loading...'}</div>;
};
