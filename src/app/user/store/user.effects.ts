import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { UserService } from "../services/user.service";
import { requestCurrentUser, requestCurrentUserFail, requestCurrentUserSuccess } from "./user.actions";

@Injectable()
export class UserEffects {
    
    getCurrentUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(requestCurrentUser),
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