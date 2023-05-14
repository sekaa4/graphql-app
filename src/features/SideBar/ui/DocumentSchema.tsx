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
interface DocumentSchemaProps {
  schema?: string;
}
const DocumentSchema = (props: PropsWithChildren<DocumentSchemaProps>) => {
  const { children, schema } = props;
  const curPath = useAppSelector(getDocumentationCurPath);
  const prevPath = useAppSelector(getDocumentationPrevPath);
  const dispatch = useAppDispatch();
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
