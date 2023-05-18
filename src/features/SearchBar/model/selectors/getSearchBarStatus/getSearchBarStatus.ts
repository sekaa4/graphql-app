import { createSelector } from '@reduxjs/toolkit';

import { SearchBarState } from '../../types/SearchBarState.type';
import { getSearchBarState } from '../getSearchBarState/getSearchBarState';

export const getSearchBarStatus = createSelector(
  getSearchBarState,
  (searchBar: SearchBarState) => searchBar.isValidAPI
);
