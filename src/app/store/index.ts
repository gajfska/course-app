import { ActionReducerMap } from "@ngrx/store";
import { userFeatureKey, userReducer, UserState } from "../user/store/user.reducer";
import { UserEffects } from "../user/store/user.effects";
import { AuthEffects } from "../auth/store/auth.effects";
import { authFeatureKey, authReducer, AuthState } from "../auth/store/auth.reducer";
import { authorsFeatureKey, authorsReducer, AuthorsState } from "./authors/authors.reducer";
import { coursesFeatureKey, coursesReducer, CoursesState } from "./courses/courses.reducer";
import { CoursesEffects } from "./courses/courses.effects";
import { AuthorsEffects } from "./authors/authors.effects";

export interface State {
    [userFeatureKey]: UserState,
    [authFeatureKey]: AuthState,
    [authorsFeatureKey]: AuthorsState
    [coursesFeatureKey]: CoursesState
}
export const reducers: ActionReducerMap<State> = {
    [userFeatureKey]: userReducer,
    [authFeatureKey]: authReducer,
    [authorsFeatureKey]: authorsReducer,
    [coursesFeatureKey]: coursesReducer
}
export const effects = [
    UserEffects,
    AuthEffects,
    CoursesEffects,
    AuthorsEffects
];