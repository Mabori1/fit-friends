import { NameSpace } from '../constants';
import { combineReducers } from 'redux';
import { userSlice } from './userSlice/userSlice';
import { trainingSlice } from './trainingSlice/trainingSlice';

export const rootReducer = combineReducers({
  [NameSpace.UserSlice]: userSlice.reducer,
  [NameSpace.TrainingSlice]: trainingSlice.reducer,
});
