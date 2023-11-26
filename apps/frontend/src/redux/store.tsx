import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../services/axiosInstance';

export const api = axiosInstance;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
