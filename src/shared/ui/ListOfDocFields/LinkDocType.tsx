import { GraphQLNamedType } from 'graphql';
import React from 'react';

import cls from '@/features/SideBar/ui/documentSchema.module.css';

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
          <a data-name={namedType.name} onClick={handleClickNextPath} className={cls['query-name']}>
            {namedType.name}
          </a>
          ]
        </span>
      )}
      {isGraphQLList && isGraphQLNonNull && (
        <span>
          [
          <a data-name={namedType.name} onClick={handleClickNextPath} className={cls['query-name']}>
            {namedType.name}
          </a>
          !]
        </span>
      )}
      {!isGraphQLList && isGraphQLNonNull && (
        <span>
          <a data-name={namedType.name} onClick={handleClickNextPath} className={cls['query-name']}>
            {namedType.name}
          </a>
          !
        </span>
      )}
      {!isGraphQLList && !isGraphQLNonNull && (
        <span>
          <a data-name={namedType.name} onClick={handleClickNextPath} className={cls['query-name']}>
            {namedType.name}
          </a>
        </span>
      )}
    </>
  );
};
