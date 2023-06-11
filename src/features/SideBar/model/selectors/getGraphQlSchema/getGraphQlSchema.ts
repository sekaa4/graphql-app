import { RootState } from '@/app/providers/StoreProvider/store/store';

export const getGraphQlSchema = (state: RootState) => state.graphQlSchema;
