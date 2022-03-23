import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import {requestCurrentUserFail, requestCurrentUserSuccess } from "./user.actions";

export interface UserState {
    isAdmin: boolean
    name: string
}

export const userFeatureKey = 'UserStore'

const initialState: UserState = {isAdmin: false, name: ''};

const _userReducer = createReducer(
    initialState,
    on(requestCurrentUserSuccess, (state, user) => {
        console.log(state)
        return { 
            name: user.name,
            isAdmin: user.role === "admin" 
        }
    }),
    on(requestCurrentUserFail, (state) => state)
);

export const userReducer = (state: UserState | undefined, action: Action): UserState => _userReducer(state, action);