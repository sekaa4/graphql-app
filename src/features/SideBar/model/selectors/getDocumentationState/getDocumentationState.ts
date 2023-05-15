import { RootState } from '@/app/providers/StoreProvider/store/store';

export const getDocumentationState = (state: RootState) => state.documentationState;
