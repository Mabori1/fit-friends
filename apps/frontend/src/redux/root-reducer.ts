import { NameSpace } from '../constants';
import { combineReducers } from 'redux';
import { userSlice } from './userSlice/userSlice';

export const rootReducer = combineReducers({
  [NameSpace.UserSlice]: userSlice.reducer,
});
