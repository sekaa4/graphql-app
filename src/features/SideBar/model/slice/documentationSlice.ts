import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DocumentationState } from '../types/Documentation.type';

const initialState: DocumentationState = {
  curPath: null,
  prevPath: null,
  paths: [],
};

export const documentationSlice = createSlice({
  name: 'documentationState',
  initialState,
  reducers: {
    changeCurPath: (state, action: PayloadAction<string>) => {
      state.paths = [...state.paths, action.payload];
      state.prevPath = state.paths.length === 1 ? 'Documentation' : state.curPath;
      state.curPath = action.payload;
    },
    changePrevPath: (state, action: PayloadAction<string>) => {
      state.paths.pop();

      if (state.paths.length === 0) {
        state.curPath = null;
        state.prevPath = null;
        return;
      }
      if (state.paths.length === 1) {
        state.curPath = action.payload;
        state.prevPath = 'Documentation';
        return;
      }
      const value = state.paths.at(-2);
      state.curPath = state.prevPath;
      state.prevPath = typeof value === 'string' ? value : null;
    },
  },
});

export const { reducer: documentationReducer } = documentationSlice;
export const { actions: documentationActions } = documentationSlice;
