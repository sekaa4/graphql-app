import { RootState } from '@/app/providers/StoreProvider/store/store';

export const getSearchBarState = (state: RootState) => state.searchBarState;
