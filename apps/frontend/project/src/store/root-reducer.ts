import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../common/const';
import { userData } from './user-data/user-data';

export const rootReducer = combineReducers({
  [NameSpace.Data]: userData.reducer,
});
