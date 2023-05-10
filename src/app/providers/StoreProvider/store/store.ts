import { configureStore } from '@reduxjs/toolkit';

import { schemaReducer } from '@/entities/CustomSchema';

import { StateSchema } from './StateSchema';

export const createReduxStore = (initialState?: StateSchema) => {
  return configureStore<StateSchema>({
    reducer: {
      graphQlSchema: schemaReducer,
    },
    preloadedState: initialState,
  });
};

export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore['dispatch'];
