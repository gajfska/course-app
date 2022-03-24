import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userFeatureKey, UserState } from "./user.reducer";

const getUserState = createFeatureSelector<UserState>(userFeatureKey)


export const getName = createSelector(
    getUserState,
    (state: UserState) => state.name
);

export const isAdmin = createSelector(
    getUserState,
    (state: UserState) => state.isAdmin
);