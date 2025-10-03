import { configureStore } from '@reduxjs/toolkit'

import { accountApi } from './services/account.service'
import { documentsApi } from "./services/documents.service";
import { vehiclesApi } from "./services/vehicles.service";
import { trailersApi } from "./services/trailers.service";
import { companyApi } from "./services/company.service";
import authSlice from "./slices/auth-slice";

const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
    [vehiclesApi.reducerPath]: vehiclesApi.reducer,
    [trailersApi.reducerPath]: trailersApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      accountApi.middleware,
      documentsApi.middleware,
      vehiclesApi.middleware,
      trailersApi.middleware,
      companyApi.middleware,
    ]),
});

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
