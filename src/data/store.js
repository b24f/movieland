import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import moviesSlice from './moviesSlice'
import starredSlice from './starredSlice'
import watchLaterSlice from './watchLaterSlice'

import { moviesApi } from './moviesSlice'

const store = configureStore({
    reducer: {
        movies: moviesSlice.reducer,
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer,
        [moviesApi.reducerPath]: moviesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware),
})

setupListeners(store.dispatch);

export default store
