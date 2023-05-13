import { GraphQLObjectType } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

export type GraphQlSchemaKeysOfObj = ('query' | 'mutation' | 'subscription')[];
export type GraphQlSchemaFieldsObj = {
  query: Maybe<GraphQLObjectType<any, any>>;
  mutation: Maybe<GraphQLObjectType<any, any>>;
  subscription: Maybe<GraphQLObjectType<any, any>>;
};
