import {
  buildSchema,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLUnionType,
} from 'graphql';

import { GraphQlSchemaObjFields } from '@/entities/CustomSchemaTree/types/GraphQlSchemaObjFields.type';

const getSchemaObj = (schema: string) => {
  return buildSchema(schema);
};

const getTypesSchema = (schema: GraphQLSchema) => {
  return {
    query: schema.getQueryType(),
    mutation: schema.getMutationType(),
    subscription: schema.getSubscriptionType(),
  };
};

const graphQlSchemaOperations = (schema: string) => {
  const schemaObj = getSchemaObj(schema);
  const typesOfSchemaObj = getTypesSchema(schemaObj);
  const keys = Object.keys(typesOfSchemaObj) as Array<keyof typeof typesOfSchemaObj>;

  return {
    keys,
    typesOfSchemaObj,
  };
};
type unknow =
  | GraphQLScalarType
  | GraphQLObjectType
  | GraphQLInterfaceType
  | GraphQLUnionType
  | GraphQLEnumType
  | GraphQLInputObjectType;

const graphQlSchemaFieldsOperations = (schema: string, path: string): GraphQlSchemaObjFields => {
  const schemaObj = getSchemaObj(schema);
  const typedObj = schemaObj.getType(path) as unknow;
  const { description, name } = typedObj;

  if ('_fields' in typedObj) {
    const fieldsOfConfigTypedObj = typedObj.getFields();
    const keys = Object.keys(fieldsOfConfigTypedObj) as Array<keyof typeof fieldsOfConfigTypedObj>;

    return {
      description,
      keys,
      fieldsOfConfigTypedObj,
      name,
    };
  }

  if ('_values' in typedObj) {
    const fieldsOfConfigEnumTyped = typedObj.getValues();
    const description = typedObj.description;

    return {
      description,
      name,
      fieldsOfConfigEnumTyped,
    };
  }

  return {
    description,
    name,
  };
};

export { graphQlSchemaFieldsOperations, graphQlSchemaOperations };
