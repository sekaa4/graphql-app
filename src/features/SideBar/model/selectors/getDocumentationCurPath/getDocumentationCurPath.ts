import { createSelector } from '@reduxjs/toolkit';

import { DocumentationState } from '../../types/Documentation.type';
import { getDocumentationState } from '../getDocumentationState/getDocumentationState';

export const getDocumentationCurPath = createSelector(
  getDocumentationState,
  (documentationState: DocumentationState) => documentationState.curPath
);
