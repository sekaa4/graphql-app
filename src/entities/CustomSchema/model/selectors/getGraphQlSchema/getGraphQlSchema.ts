import type { StateSchema } from '@/app/providers/StoreProvider';

export const getGraphQlSchema = (state: StateSchema) => state.graphQlSchema;
