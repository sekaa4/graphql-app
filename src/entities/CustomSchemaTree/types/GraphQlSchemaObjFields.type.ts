import { GraphQLEnumValue, GraphQLFieldMap, GraphQLInputFieldMap } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

export type GraphQlSchemaObjFields = {
  description: Maybe<string>;
  name: string;
  fieldsOfConfigTypedObj?: GraphQLFieldMap<any, any> | GraphQLInputFieldMap;
  fieldsOfConfigEnumTyped?: readonly GraphQLEnumValue[];
  keys?: (string | number)[];
};
