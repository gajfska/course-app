import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthorsService } from "src/app/services/authors.service";
import { requestAuthors, requestAuthorsFail, requestAuthorsSuccess } from "./authors.actions";

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

    constructor(
        private actions$: Actions,
        private authorsService: AuthorsService){}
}