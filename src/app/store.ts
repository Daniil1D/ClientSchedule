import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { api } from "./services/api"
import auth from "../features/user/userSlice"
import { listenerMiddleware } from "../middleware/auth"
import { teachersApi } from './services/teacherApi';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [teachersApi.reducerPath]: teachersApi.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware)
      .concat(teachersApi.middleware),

})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
