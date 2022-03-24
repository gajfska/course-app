import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { requestLoginSuccess } from "src/app/auth/store/auth.actions";
import { UserService } from "../services/user.service";
import { requestCurrentUserFail, requestCurrentUserSuccess } from "./user.actions";

@Injectable()
export class UserEffects {
    
    getCurrentUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(requestLoginSuccess),
            switchMap(
                () => this.userService.getUser().pipe(
                    map( user => requestCurrentUserSuccess(user)),
                    catchError( () => of(requestCurrentUserFail()))
                )
            )
        )
    )

    constructor(
        private userService: UserService,
        private actions$: Actions) {}
}