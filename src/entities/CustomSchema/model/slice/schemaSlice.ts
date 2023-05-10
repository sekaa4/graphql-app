import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { schemaByAPI } from '../services/schemaByAPI/schemaByAPI';
import { GraphQlSchema } from '../types/GraphQlSchema.type';

const initialState: GraphQlSchema = {
  currentSchema: null,
  isLoading: false,
  error: undefined,
};

export const schemaSlice = createSlice({
  name: 'graphQlSchema',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(schemaByAPI.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(schemaByAPI.fulfilled, (state, action: PayloadAction<string | undefined>) => {
        if (action.payload) {
          state.currentSchema = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(schemaByAPI.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      });
  },
});

export const { reducer: schemaReducer } = schemaSlice;
export const { actions: schemaActions } = schemaSlice;
