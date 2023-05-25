import React, { PropsWithChildren } from 'react';

import { CustomSchema } from '@/entities/CustomSchema';
import { CustomSchemaTree } from '@/entities/CustomSchemaTree';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import {
  graphQlSchemaFieldsOperations,
  graphQlSchemaOperations,
} from '@/shared/lib/graphQlSchemaOperations/graphQlSchemaOperations';

import { getDocumentationCurPath, getDocumentationPrevPath } from '../model/selectors';
import { documentationActions } from '../model/slice/documentationSlice';
import cls from './documentSchema.module.css';
interface DocumentSchemaProps {
  schema?: string;
}
const DocumentSchema = (props: PropsWithChildren<DocumentSchemaProps>) => {
  const { children, schema } = props;
  const curPath = useAppSelector(getDocumentationCurPath);
  const prevPath = useAppSelector(getDocumentationPrevPath);
  const dispatch = useAppDispatch();
  const path = { curPath, prevPath };

  const handleClickNextPath = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const path = e.target as HTMLElement;
    const nextPath = typeof path.dataset.name === 'string' ? path.dataset.name : false;

    dispatch(documentationActions.changeCurPath(nextPath));
  };

  const handleClickPrevPath = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const path = e.target as HTMLDivElement;
    const prevPath = typeof path.dataset.name === 'string' ? path.dataset.name : false;

    dispatch(documentationActions.changePrevPath(prevPath));
  };

  return (
    <div className={cls.wrapper}>
      {schema && !curPath && (
        <CustomSchema
          schema={graphQlSchemaOperations(schema)}
          handleClickNextPath={handleClickNextPath}
        />
      )}
      {schema && curPath && (
        <CustomSchemaTree
          path={path}
          fields={graphQlSchemaFieldsOperations(schema, curPath)}
          handleClickNextPath={handleClickNextPath}
          handleClickPrevPath={handleClickPrevPath}
        />
      )}
      {children}
    </div>
  );
};

export default DocumentSchema;
