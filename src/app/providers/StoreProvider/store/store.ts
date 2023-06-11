import { AnyAction, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';

import { searchBarReducer } from '@/features/SearchBar';
import { documentationReducer, schemaReducer } from '@/features/SideBar';
import rtkAPI from '@/shared/api/rtkApi';

const combinedReducer = combineReducers({
  graphQlSchema: schemaReducer,
  [rtkAPI.reducerPath]: rtkAPI.reducer,
  documentationState: documentationReducer,
  searchBarState: searchBarReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'RESET') {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};

export const createReduxStore = (initialState?: RootState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkAPI.middleware),
  });
};

export type RootState = ReturnType<typeof combinedReducer>;
export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore['dispatch'];
