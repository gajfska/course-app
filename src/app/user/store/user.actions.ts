import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/auth/services/auth.service';

export const requestCurrentUser = createAction('[User] requestCurrentUser');
export const requestCurrentUserSuccess = createAction('[User] requestCurrentUserSuccess', props<User>());
export const requestCurrentUserFail = createAction('[User] requestCurrentUserFail');