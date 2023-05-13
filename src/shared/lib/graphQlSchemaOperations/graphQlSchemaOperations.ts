import { buildSchema, GraphQLObjectType, GraphQLScalarType, GraphQLSchema } from 'graphql';

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

const graphQlSchemaFieldsOperations = (schema: string, path: string) => {
  const schemaObj = getSchemaObj(schema);
  const typedObj = schemaObj.getType(path);
  if (typedObj instanceof GraphQLObjectType) {
    const fieldsOfConfigTypedObj = typedObj.getFields();
    const keys = Object.keys(fieldsOfConfigTypedObj) as Array<keyof typeof fieldsOfConfigTypedObj>;

    return {
      isScalarType: false,
      keys,
      fieldsOfConfigTypedObj,
    };
  }
  const { description, name } = typedObj as GraphQLScalarType;

  return {
    isScalarType: true,
    description,
    name,
  };
};

export { graphQlSchemaFieldsOperations, graphQlSchemaOperations };
