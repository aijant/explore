import { configureStore } from '@reduxjs/toolkit'

import { accountApi } from './services/account.service'
import authSlice from './slices/auth-slice'

const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    auth: authSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      accountApi.middleware
    ])
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
