import { ReducerNameSpace } from '../const';
import { combineReducers } from 'redux';
import { authSlice } from './authSlice/authSlice';

export const rootReducer = combineReducers({
  [ReducerNameSpace.AppSlice]: authSlice.reducer,
});
