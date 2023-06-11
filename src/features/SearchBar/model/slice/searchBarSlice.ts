import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SearchBarState } from '../types/SearchBarState.type';

const initialState: SearchBarState = {
  curSearchBarInput: '',
  isValidAPI: false,
};

const searchBarSlice = createSlice({
  name: 'searchBarState',
  initialState,
  reducers: {
    changeSearchBarInput: (state, action: PayloadAction<string>) => {
      state.curSearchBarInput = action.payload;
    },
    changeStatusSearchBarInput: (state, action: PayloadAction<boolean>) => {
      state.isValidAPI = action.payload;
    },
  },
});

export const { reducer: searchBarReducer } = searchBarSlice;
export const { actions: searchBarActions } = searchBarSlice;
