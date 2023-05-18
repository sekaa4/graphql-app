import { createSelector } from '@reduxjs/toolkit';

import { SearchBarState } from '../../types/SearchBarState.type';
import { getSearchBarState } from '../getSearchBarState/getSearchBarState';

export const getSearchBarInput = createSelector(
  getSearchBarState,
  (searchBar: SearchBarState) => searchBar.curSearchBarInput
);
