import { ActionReducerMap } from "@ngrx/store";
import { userFeatureKey, userReducer, UserState } from "../user/store/user.reducer";
import { UserEffects } from "../user/store/user.effects";
import { AuthEffects } from "../auth/store/auth.effects";
import { authFeatureKey, authReducer, AuthState } from "../auth/store/auth.reducer";
import { authorsFeatureKey, authorsReducer, AuthorsState } from "./authors/authors.reducer";

export interface State {
    [userFeatureKey]: UserState,
    [authFeatureKey]: AuthState,
    [authorsFeatureKey]: AuthorsState
}
export const reducers: ActionReducerMap<State> = {
    [userFeatureKey]: userReducer,
    [authFeatureKey]: authReducer,
    [authorsFeatureKey]: authorsReducer
}
export const effects = [
    UserEffects,
    AuthEffects
];