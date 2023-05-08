import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { GraphQlSchema } from '../types/graphQlSchema';

const initialState: GraphQlSchema = {
  currentSchema: null,
};

export const schemaSlice = createSlice({
  name: 'graphQlSchema',
  initialState,
  reducers: {
    addSchema: (state, action: PayloadAction<string>) => {
      state.currentSchema = action.payload;
    },
  },
});

export const { reducer: schemaReducer } = schemaSlice;
export const { actions: schemaActions } = schemaSlice;
