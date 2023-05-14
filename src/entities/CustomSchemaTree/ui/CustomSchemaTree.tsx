import { getNamedType, GraphQLList, GraphQLNonNull } from 'graphql';
import React from 'react';
import { v4 } from 'uuid';

import { GraphQlSchemaObjFields } from '../types/GraphQlSchemaObjFields.type';

interface CustomSchemaProps {
  path: {
    curPath: string | null;
    prevPath: string | null;
  };
  fields: GraphQlSchemaObjFields;
  handleClickNextPath: (e: React.MouseEvent<HTMLSpanElement>) => void;
  handleClickPrevPath: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

export const CustomSchemaTree = (props: CustomSchemaProps) => {
  const {
    path: { curPath, prevPath },
    fields,
    handleClickNextPath,
    handleClickPrevPath,
  } = props;
  const { description, fieldsOfConfigTypedObj, fieldsOfConfigEnumTyped, keys, isEnum } = fields;

  return (
    <>
      <div
        onClick={handleClickPrevPath}
        id={prevPath ?? ''}
        style={{
          cursor: 'pointer',
          color: 'yellow',
          textDecoration: 'underline',
        }}
      >
        {prevPath ?? ''}
      </div>
      <h3>{`${curPath}`}</h3>
      <div>{description}</div>
      <ul>
        {keys &&
          keys.map((nameField) => {
            if (fieldsOfConfigTypedObj && fieldsOfConfigTypedObj[nameField] && !isEnum) {
              const namedType = getNamedType(fieldsOfConfigTypedObj[nameField].type);
              const isGraphQLList = fieldsOfConfigTypedObj[nameField].type instanceof GraphQLList;
              const isGraphQLNonNull =
                fieldsOfConfigTypedObj[nameField].type instanceof GraphQLNonNull;

              return (
                <>
                  <li>
                    <div>{fieldsOfConfigTypedObj[nameField].description}</div>
                    <div>
                      <span>{nameField}:</span>

                      {isGraphQLList && !isGraphQLNonNull && (
                        <span>
                          [
                          <a
                            id={namedType.name}
                            onClick={handleClickNextPath}
                            style={{
                              cursor: 'pointer',
                              color: 'yellow',
                              textDecoration: 'underline',
                            }}
                          >
                            {namedType.name}
                          </a>
                          ]
                        </span>
                      )}
                      {isGraphQLList && isGraphQLNonNull && (
                        <span>
                          [
                          <a
                            id={namedType.name}
                            onClick={handleClickNextPath}
                            style={{
                              cursor: 'pointer',
                              color: 'yellow',
                              textDecoration: 'underline',
                            }}
                          >
                            {namedType.name}
                          </a>
                          !]
                        </span>
                      )}
                      {!isGraphQLList && isGraphQLNonNull && (
                        <span>
                          <a
                            id={namedType.name}
                            onClick={handleClickNextPath}
                            style={{
                              cursor: 'pointer',
                              color: 'yellow',
                              textDecoration: 'underline',
                            }}
                          >
                            {namedType.name}
                          </a>
                          !
                        </span>
                      )}
                      {!isGraphQLList && !isGraphQLNonNull && (
                        <span>
                          <a
                            id={namedType.name}
                            onClick={handleClickNextPath}
                            style={{
                              cursor: 'pointer',
                              color: 'yellow',
                              textDecoration: 'underline',
                            }}
                          >
                            {namedType.name}
                          </a>
                        </span>
                      )}
                    </div>
                  </li>
                </>
              );
            }
          })}
        {fieldsOfConfigEnumTyped &&
          fieldsOfConfigEnumTyped.map((nameField) => {
            const namedField = nameField;
            return (
              <div key={v4()}>
                <li>
                  <div>{namedField.description}</div>
                  <div>
                    <span>{namedField.name}</span>
                  </div>
                </li>
              </div>
            );
          })}
      </ul>
    </>
  );
};
