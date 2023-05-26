import { getNamedType, GraphQLList, GraphQLNonNull } from 'graphql';
import React from 'react';
import { v4 } from 'uuid';

import { ListOfDocFields, ListOfEnumDocFields } from '@/shared/ui';

import cls from '@/features/SideBar/ui/documentSchema.module.css';
import { GraphQlSchemaObjFields } from '../types/GraphQlSchemaObjFields.type';

interface CustomSchemaProps {
  path: {
    curPath: string | null;
    prevPath: string | null;
  };
  fields: GraphQlSchemaObjFields;
  handleClickNextPath: (e: React.MouseEvent<HTMLElement>) => void;
  handleClickPrevPath: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const CustomSchemaTree = (props: CustomSchemaProps) => {
  const {
    path: { curPath, prevPath },
    fields,
    handleClickNextPath,
    handleClickPrevPath,
  } = props;
  const { description, fieldsOfConfigTypedObj, fieldsOfConfigEnumTyped, keys } = fields;

  return (
    <>
      <div onClick={handleClickPrevPath} data-name={prevPath ?? false} className={cls.breadcrumbs}>
        {'< ' + prevPath ?? ''}
      </div>
      <h3 className={cls.title}>{`${curPath}`}</h3>
      <div>{description}</div>
      <ul>
        {keys &&
          fieldsOfConfigTypedObj &&
          keys.map((nameField) => {
            const nameFieldObj = fieldsOfConfigTypedObj[nameField];
            const namedType = getNamedType(nameFieldObj.type);
            const description = nameFieldObj.description;
            const isGraphQLList = nameFieldObj.type instanceof GraphQLList;
            const isGraphQLNonNull = nameFieldObj.type instanceof GraphQLNonNull;
            const args = 'args' in nameFieldObj && nameFieldObj.args;

            return (
              <ListOfDocFields
                key={v4()}
                isGraphQLList={isGraphQLList}
                isGraphQLNonNull={isGraphQLNonNull}
                namedType={namedType}
                nameField={nameField}
                description={description}
                args={args}
                handleClickNextPath={handleClickNextPath}
              />
            );
          })}
        {fieldsOfConfigEnumTyped &&
          fieldsOfConfigEnumTyped.map((nameField) => {
            const description = nameField.description;
            const name = nameField.name;

            return <ListOfEnumDocFields key={v4()} name={name} description={description} />;
          })}
      </ul>
    </>
  );
};
