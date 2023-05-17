import { GraphQLNamedType } from 'graphql';
import React from 'react';

interface LinkDocTypeProps {
  isGraphQLList: boolean;
  isGraphQLNonNull: boolean;
  namedType: GraphQLNamedType;
  handleClickNextPath: (e: React.MouseEvent<HTMLElement>) => void;
}

export const LinkDocType = (props: LinkDocTypeProps) => {
  const { namedType, isGraphQLList, isGraphQLNonNull, handleClickNextPath } = props;

  return (
    <>
      {isGraphQLList && !isGraphQLNonNull && (
        <span>
          [
          <a
            data-name={namedType.name}
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
            data-name={namedType.name}
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
            data-name={namedType.name}
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
            data-name={namedType.name}
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
    </>
  );
};
