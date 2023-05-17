import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { searchBarReducer } from '@/features/SearchBar';
import { documentationReducer, schemaReducer } from '@/features/SideBar';
import rtkAPI from '@/shared/api/rtkApi';

const rootReducer = combineReducers({
  graphQlSchema: schemaReducer,
  [rtkAPI.reducerPath]: rtkAPI.reducer,
  documentationState: documentationReducer,
  searchBarState: searchBarReducer,
});

export const createReduxStore = (initialState?: RootState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore['dispatch'];
