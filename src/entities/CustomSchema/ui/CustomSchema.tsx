import { GraphQLObjectType } from 'graphql';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';

import { GraphQlSchemaFieldsObj, GraphQlSchemaKeysOfObj } from '../types/GraphQlSchemaObj.type';

interface CustomSchemaProps {
  schema: {
    keys: GraphQlSchemaKeysOfObj;
    typesOfSchemaObj: GraphQlSchemaFieldsObj;
  };
  handleClickNextPath: (e: React.MouseEvent<HTMLElement>) => void;
}

export const CustomSchema = (props: CustomSchemaProps) => {
  const {
    schema: { keys, typesOfSchemaObj },
    handleClickNextPath,
  } = props;
  const { t } = useTranslation('common');

  return (
    <>
      <h2>{t('doc')}</h2>
      <div>{t('descriptionDoc')}</div>
      <ul>
        {keys &&
          keys.map((type) => {
            if (typesOfSchemaObj[type] instanceof GraphQLObjectType) {
              return (
                <li key={v4()}>
                  <span>{type}:</span>
                  <span
                    data-name={typesOfSchemaObj[type]?.name}
                    onClick={handleClickNextPath}
                    style={{
                      cursor: 'pointer',
                      color: 'yellow',
                      textDecoration: 'underline',
                    }}
                  >
                    {typesOfSchemaObj[type]?.name}
                  </span>
                </li>
              );
            }
          })}
      </ul>
    </>
  );
};
