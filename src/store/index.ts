import { configureStore } from '@reduxjs/toolkit'

import { accountApi } from './services/account.service'
import { documentsApi } from "./services/documents.service";
import authSlice from "./slices/auth-slice";

const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      accountApi.middleware,
      documentsApi.middleware,
    ]),
});

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
