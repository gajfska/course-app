import { createAction, props } from "@ngrx/store";
import { Author } from "src/app/services/authors.service";

export const requestAuthors = createAction('[Authors] requestAuthors');
export const requestAuthorsSuccess = createAction('[Authors] requestAuthorsSuccess', props<{authors: Author[]}>());
export const requestAuthorsFail = createAction('[Authors] requestAuthorsFail');

export const requestAddAuthors = createAction('[Authors] requestAddAuthors', props<Author>());
export const requestAddAuthorsSuccess = createAction('[Authors] requestAddAuthorsSuccess', props<Author>());
export const requestAddAuthorsFail = createAction('[Authors] requestAddAuthorsFail');

export const resetAddedAuthor = createAction('[Authors] resetAddedAuthor');

export const requestSingleAuthor = createAction('[Authors] requestSingleAuthor', props<{id: string}>());
export const requestSingleAuthorSuccess = createAction('[Authors] requestSingleSuccess', props<Author>());
export const requestSingleAuthorFail = createAction('[Authors] requestSingleFail');
