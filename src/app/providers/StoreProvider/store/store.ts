import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { schemaReducer } from '@/entities/CustomSchema';
import rtkAPI from '@/shared/api/rtkApi';

const rootReducer = combineReducers({
  graphQlSchema: schemaReducer,
  [rtkAPI.reducerPath]: rtkAPI.reducer,
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
