import { AuthStatus } from '../common/const';
import { store } from '../store/index';

export type UserSlice = {
  authStatus: AuthStatus;
};
export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
