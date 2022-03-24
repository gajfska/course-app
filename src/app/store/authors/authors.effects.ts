import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthorsService } from "src/app/services/authors.service";
import { requestSingleCourseSuccess } from "../courses/courses.actions";
import { requestAddAuthors, requestAddAuthorsFail, requestAddAuthorsSuccess, requestAuthors, requestAuthorsFail, requestAuthorsSuccess, requestSingleAuthor, requestSingleAuthorFail, requestSingleAuthorSuccess } from "./authors.actions";

@Injectable()
export class AuthorsEffects {
    getAuthors$ = createEffect(
        () => this.actions$.pipe(
            ofType(requestAuthors),
            switchMap(
                () => this.authorsService.getAll().pipe(
                    map(authors => requestAuthorsSuccess({ authors: authors })),
                    catchError(() => of(requestAuthorsFail()))
                )
            )
        )
    );

    addAuthor$ = createEffect(
        () => this.actions$.pipe(
            ofType(requestAddAuthors),
            switchMap(
                (author) => this.authorsService.addAuthor(author).pipe(
                    map ( author => requestAddAuthorsSuccess(author)),
                    catchError(() => of(requestAddAuthorsFail()))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private authorsService: AuthorsService){}
}