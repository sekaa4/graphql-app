import { GraphQLArgument, GraphQLNamedType } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import React from 'react';
import { v4 } from 'uuid';

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
        {args && (
          <span className="arg">
            {nameField}(
            {args.map((arg) => {
              return (
                <div key={v4()}>
                  {arg.name}: {arg.type.toString()}
                </div>
              );
            })}
            ):
          </span>
        )}
        {!args && <span>{nameField}:</span>}

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
  );
};
