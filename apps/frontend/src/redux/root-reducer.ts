import { NameSpace } from '../const';
import { combineReducers } from 'redux';
import { authSlice } from './authSlice/authSlice';

export const rootReducer = combineReducers({
  [NameSpace.AuthSlice]: authSlice.reducer,
});
