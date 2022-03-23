import { Action, createReducer, on } from "@ngrx/store";
import { requestLoginFail, requestLoginSuccess, requestLogout, requestLogoutSuccess, requestRegisterFail, requestRegisterSuccess } from "./auth.actions";

export const authFeatureKey = 'AuthStore'

export interface AuthState {
    isAuthorized: boolean;
    token?: string;
    errorMessage?: string;
}

const initialState: AuthState = {isAuthorized: false, token: undefined, errorMessage: undefined}

const _authReducer = createReducer(
    initialState,
    on(requestLoginSuccess, (_, response) => {
        return {
            isAuthorized: true,
            token: response.token,
            errorMessage: undefined
        }
    }),
    on(requestLoginFail, (_, error) => {
        return {
            isAuthorized: false,
            token: undefined,
            errorMessage: error.errorMessage
        }
    }),
    on(requestRegisterSuccess, (_, response) => {
        return {
            isAuthorized: true,
            token: response.token,
            errorMessage: undefined
        }
    }),
    on(requestRegisterFail, (_, error) => {
        return {
            isAuthorized: false,
            token: undefined,
            errorMessage: error.errorMessage
        }
    }),
    on(requestLogout, (el) => el),
    on(requestLogoutSuccess, (el) => el)
);

export const authReducer = (state: AuthState | undefined, action: Action): AuthState => _authReducer(state, action);