import { configureStore } from '@reduxjs/toolkit';
import { createAPI, createRefreshTokensAPI } from '../services/api';
import { rootReducer } from './root-reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const api = createAPI();
export const refreshTokensAPI = createRefreshTokensAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: [api, refreshTokensAPI],
      },
    }),
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
