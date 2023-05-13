import { GraphQLFieldMap } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

export type GraphQlSchemaObjFields = {
  isScalarType: boolean;
  keys?: (string | number)[];
  fieldsOfConfigTypedObj?: GraphQLFieldMap<any, any>;
  description?: Maybe<string>;
  name?: string;
};
