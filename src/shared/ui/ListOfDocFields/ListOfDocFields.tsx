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

import { LinkDocType } from './LinkDocType';

interface ListOfDocFieldsProps {
  isGraphQLList: boolean;
  isGraphQLNonNull: boolean;
  namedType: GraphQLNamedType;
  nameField: string | number;
  description: Maybe<string>;
  args: false | readonly GraphQLArgument[];
  handleClickNextPath: (e: React.MouseEvent<HTMLSpanElement>) => void;
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
      <div>{description}</div>
      <div>
        {args && args.length !== 0 && (
          <span className="arg">
            {nameField}(
            {args.map((arg) => {
              const namedType = getNamedType(arg.type);
              const isGraphQLList = arg.type instanceof GraphQLList;
              const isGraphQLNonNull = arg.type instanceof GraphQLNonNull;

              return (
                <div key={v4()}>
                  {arg.name}:{' '}
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
        {(!args || args.length === 0) && <span>{nameField}:</span>}

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
