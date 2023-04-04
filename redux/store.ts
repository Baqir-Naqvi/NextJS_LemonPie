import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import { rtkQueryErrorLogger } from './middlewares/errorHandler.middleware'
import { api } from './api'
import authReducer from './auth/auth.reducer'
import contractReducer from './contract/contract.reducer'
import { rtkQuerySuccessLogger } from './middlewares/successHandler.middleware'

let middlewares = [rtkQuerySuccessLogger, rtkQueryErrorLogger]
if(process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    contract: contractReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(api.middleware, ...middlewares),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store