import { GraphQLUnionType } from 'graphql';
import { t } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('common');
  const { isScalarType, description, fieldsOfConfigTypedObj, keys, name } = fields;
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
      <div>
        {fieldsOfConfigTypedObj && (fieldsOfConfigTypedObj.description as unknown as string)}
      </div>
      <ul>
        {keys &&
          keys.map((nameField) => {
            if (fieldsOfConfigTypedObj && fieldsOfConfigTypedObj[nameField]) {
              return (
                <li key={v4()}>
                  <div>
                    {(fieldsOfConfigTypedObj[nameField]?.type as GraphQLUnionType).description}
                  </div>
                  <span>{nameField}:</span>
                  <span
                    id={(fieldsOfConfigTypedObj[nameField]?.type as GraphQLUnionType).name}
                    onClick={handleClickNextPath}
                    style={{
                      cursor: 'pointer',
                      color: 'yellow',
                      textDecoration: 'underline',
                    }}
                  >
                    {(fieldsOfConfigTypedObj[nameField]?.type as GraphQLUnionType).name}
                  </span>
                </li>
              );
            }
          })}
      </ul>
    </>
  );
};
