import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'
import { moviesApi } from '../data/moviesSlice'

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { 
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer,
        [moviesApi.reducerPath]: moviesApi.reducer,
      },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(moviesApi.middleware),
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {

  setupListeners(store.dispatch)

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}