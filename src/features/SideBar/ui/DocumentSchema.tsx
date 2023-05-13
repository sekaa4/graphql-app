import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { CustomSchema } from '@/entities/CustomSchema';
import { CustomSchemaTree } from '@/entities/CustomSchemaTree';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import {
  graphQlSchemaFieldsOperations,
  graphQlSchemaOperations,
} from '@/shared/lib/graphQlSchemaOperations/graphQlSchemaOperations';

import { getDocumentationCurPath, getDocumentationPrevPath } from '../model/selectors';
import { documentationActions } from '../model/slice/documentationSlice';
interface DocumentSchemaProps {
  schema?: string;
  error?: FetchBaseQueryError | SerializedError;
  isLoading: boolean;
}
const DocumentSchema = (props: PropsWithChildren<DocumentSchemaProps>) => {
  const { children, isLoading, error, schema } = props;
  const curPath = useAppSelector(getDocumentationCurPath);
  const prevPath = useAppSelector(getDocumentationPrevPath);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');
  const path = { curPath, prevPath };

  const handleClickNextPath = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const path = e.target as HTMLAnchorElement;

    dispatch(documentationActions.changeCurPath(path.id));
  };

  const handleClickPrevPath = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const path = e.target as HTMLAnchorElement;

    dispatch(documentationActions.changePrevPath(path.id));
  };

  return (
    <div>
      {isLoading && <div>LOADING...</div>}
      {!isLoading && !error && schema && !curPath && (
        <CustomSchema
          schema={graphQlSchemaOperations(schema)}
          handleClickNextPath={handleClickNextPath}
        />
      )}
      {!isLoading && !error && schema && curPath && (
        <CustomSchemaTree
          path={path}
          fields={graphQlSchemaFieldsOperations(schema, curPath)}
          handleClickNextPath={handleClickNextPath}
          handleClickPrevPath={handleClickPrevPath}
        />
      )}
      {!isLoading && error && (
        <>
          <div>{'Invalid schema, pls try one more time'}</div>
          <div>{JSON.stringify(error, null, 2)}</div>
        </>
      )}
      {children}
    </div>
  );
};

export default DocumentSchema;
