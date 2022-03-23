import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "src/app/store";
import { authFeatureKey, AuthState } from "./auth.reducer";

const getAuthState = createFeatureSelector<AuthState>(authFeatureKey)
// export const selectFeature = (state: State) => state.feature;
// export const getArticleState = createFeatureSelector<AuthState>('articleState');


export const isUserAuthorized = createSelector(
    getAuthState,
    (state: AuthState) => state.isAuthorized
);

export const getToken = createSelector(
    getAuthState,
    (state: AuthState) => state?.token
);

export const getSpecificErrorMessage = createSelector(
    getAuthState,
    (state: AuthState) => state?.errorMessage
);