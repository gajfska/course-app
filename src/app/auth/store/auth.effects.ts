import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { requestLogin, requestLoginFail, requestLoginSuccess, requestRegister, requestRegisterFail, requestRegisterSuccess } from "./auth.actions";

@Injectable()
export class AuthEffects {

    login$ = createEffect(
        () => this.actions$.pipe(
            ofType(requestLogin),
            switchMap(
                (user) => this.authService.loginNg(user).pipe(
                    map((response) => requestLoginSuccess({token: response.result})),
                    catchError((error) => of(requestLoginFail({errorMessage: error.message})))
                )
            )
        )
    )

    register$ = createEffect(
        () => this.actions$.pipe(
            ofType(requestRegister),
            switchMap(
                (user) => this.authService.register(user).pipe(
                    map((response) => requestRegisterSuccess({token: response.result})),
                    catchError((error) => of(requestRegisterFail({errorMessage: error.message})))
                )
            )
        )
    )


    constructor(
        private authService: AuthService,
        private actions$: Actions) {}
}