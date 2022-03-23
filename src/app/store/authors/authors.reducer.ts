import { Action, createReducer, on } from "@ngrx/store";
import { Author } from "src/app/services/authors.service";
import { requestAddAuthorsFail, requestAddAuthorsSuccess, requestAuthorsFail, requestAuthorsSuccess, resetAddedAuthor } from "./authors.actions";


export const authorsFeatureKey = 'AuthorsStore';


export interface AuthorsState {
    authors: Author[];
    addedAuthor: string;
}

const initialState: AuthorsState = { authors: [], addedAuthor: ''}

const _authorsReducer = createReducer(
    initialState,
    on(requestAuthorsSuccess, (el) => el),
    on(requestAuthorsFail, (el) => el),
    on(requestAddAuthorsSuccess, (el) => el),
    on(requestAddAuthorsFail, (el) => el),
    on(resetAddedAuthor, (el) => el),

    )


export const authorsReducer = (state: AuthorsState | undefined, action: Action): AuthorsState => _authorsReducer(state, action);