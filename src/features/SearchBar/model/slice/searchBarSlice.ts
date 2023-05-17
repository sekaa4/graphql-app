import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchBarState {
  curSearchBarInput: string | null;
  isValidAPI: boolean;
}

const initialState: SearchBarState = {
  curSearchBarInput: null,
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
