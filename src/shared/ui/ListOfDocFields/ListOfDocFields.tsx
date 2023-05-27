import {
  getNamedType,
  GraphQLArgument,
  GraphQLList,
  GraphQLNamedType,
  GraphQLNonNull,
} from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import React from 'react';
import { v4 } from 'uuid';

import cls from '@/features/SideBar/ui/documentSchema.module.css';

import { LinkDocType } from './LinkDocType';

interface ListOfDocFieldsProps {
  isGraphQLList: boolean;
  isGraphQLNonNull: boolean;
  namedType: GraphQLNamedType;
  nameField: string | number;
  description: Maybe<string>;
  args: false | readonly GraphQLArgument[];
  handleClickNextPath: (e: React.MouseEvent<HTMLElement>) => void;
}

export const ListOfDocFields = (props: ListOfDocFieldsProps) => {
  const {
    description,
    nameField,
    namedType,
    isGraphQLList,
    isGraphQLNonNull,
    args,
    handleClickNextPath,
  } = props;

  return (
    <li>
      <div className={cls.description}>{description}</div>
      <div>
        {args && args.length !== 0 && (
          <span className="arg">
            {<span className={cls['name-field']}>{nameField}</span>}(
            {args.map((arg) => {
              const namedType = getNamedType(arg.type);
              const isGraphQLList = arg.type instanceof GraphQLList;
              const isGraphQLNonNull = arg.type instanceof GraphQLNonNull;

              return (
                <div key={v4()}>
                  {<span className={cls.query}>{arg.name}</span>}:{' '}
                  <LinkDocType
                    isGraphQLList={isGraphQLList}
                    isGraphQLNonNull={isGraphQLNonNull}
                    namedType={namedType}
                    handleClickNextPath={handleClickNextPath}
                  />
                </div>
              );
            })}
            ):
          </span>
        )}
        {(!args || args.length === 0) && <span className={cls.query}>{nameField}:</span>}

        <LinkDocType
          isGraphQLList={isGraphQLList}
          isGraphQLNonNull={isGraphQLNonNull}
          namedType={namedType}
          handleClickNextPath={handleClickNextPath}
        />
      </div>
    </li>
  );
};
