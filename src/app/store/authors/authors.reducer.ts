import { Action, createReducer, on } from '@ngrx/store';
import { Author } from 'src/app/services/authors.service';
import {
  requestAddAuthorsFail,
  requestAddAuthorsSuccess,
  requestAuthorsFail,
  requestAuthorsSuccess,
  requestSingleAuthorSuccess,
  resetAddedAuthor,
} from './authors.actions';

export const authorsFeatureKey = 'AuthorsStore';

export interface AuthorsState {
  authors: Author[];
  singleAuthor?: Author,
  addedAuthor?: Author;
}

const initialState: AuthorsState = { authors: [], addedAuthor: undefined, singleAuthor:undefined };

const _authorsReducer = createReducer(
  initialState,
  on(requestAuthorsSuccess, (state, response) => {
    return {
      ...state,
      authors: response.authors,
    };
  }),
  on(requestAuthorsFail, (el) => el),
  on(requestAddAuthorsSuccess, (state, author) => {
    return {
      ...state,
      addedAuthor: author,
    };
  }),
  on(requestAddAuthorsFail, (el) => el),
  on(resetAddedAuthor, (el) => el),
  on(requestSingleAuthorSuccess, (state, author) => {
    return {
      ...state,
      singleAuthor: author,
    };
  }),

);

export const authorsReducer = (
  state: AuthorsState | undefined,
  action: Action
): AuthorsState => _authorsReducer(state, action);
