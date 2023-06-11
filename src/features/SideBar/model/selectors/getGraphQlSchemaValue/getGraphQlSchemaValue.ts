import { createSelector } from '@reduxjs/toolkit';

import { GraphQlSchema } from '../../types/GraphQlSchema.type';
import { getGraphQlSchema } from '../getGraphQlSchema/getGraphQlSchema';

export const getGraphQlSchemaValue = createSelector(
  getGraphQlSchema,
  (graphQlSchema: GraphQlSchema) => graphQlSchema.currentSchema
);
