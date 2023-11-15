import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../common/const';

export const redirectToRoute = createAction<AppRoute>('user/redirectToRoute');
