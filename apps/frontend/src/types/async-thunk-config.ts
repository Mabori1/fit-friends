import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../redux/store';

export type AsyncThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};
