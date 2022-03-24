import { createAction, props } from "@ngrx/store";
import { User } from "../services/auth.service";

export const requestLogin = createAction('[Auth] requestLogin', props<User>());
export const requestLoginSuccess = createAction('[Auth] requestLoginSuccess', props<{token: string}>());
export const requestLoginFail = createAction('[Auth] requestLoginFail', props<{errorMessage: string}>());

export const requestRegister = createAction('[Auth] requestRegister', props<User>());
export const requestRegisterSuccess = createAction('[Auth] requestRegisterSuccess', props<{token: string}>());
export const requestRegisterFail = createAction('[Auth] requestRegisterFail', props<{errorMessage: string}>());

export const requestLogout = createAction('[Auth] requestLogout');
export const requestLogoutSuccess = createAction('[Auth] requestLogoutSuccess', props<{token: string}>());
