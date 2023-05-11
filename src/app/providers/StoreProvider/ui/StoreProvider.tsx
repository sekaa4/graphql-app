import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { createReduxStore, RootState } from '../store/store';
interface StoreProviderProps {
  children?: ReactNode;
  initialState?: RootState;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialState } = props;

  const store = createReduxStore(initialState);

  return <Provider store={store}>{children}</Provider>;
};
