import { isFulfilled } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { toast } from "react-toastify"
import { isActiveToastifyEndpoint } from './utils'

/**
 * Log a warning and show a toast!
 */
export const rtkQuerySuccessLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {    
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isActiveToastifyEndpoint(action) && isFulfilled(action)) {
      toast.success(
        "Operazione eseguita con successo!"
      )
    }

    return next(action)
  }