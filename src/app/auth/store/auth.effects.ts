import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { AuthService } from "../services/auth.service";
import { requestLogin, requestLoginFail, requestLoginSuccess, requestLogout, requestLogoutSuccess, requestRegister, requestRegisterFail, requestRegisterSuccess } from "./auth.actions";

@Injectable()
export class AuthEffects {

    login$ = createEffect(
        () => this.actions$.pipe(
            ofType(requestLogin),
            switchMap(
                (user) => this.authService.login(user).pipe(
                    map((response) => requestLoginSuccess({token: response.result})),
                    catchError((error) =>  of(requestLoginFail({errorMessage: error.error.result})))
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
                    catchError((error) =>  of(requestRegisterFail({errorMessage: error.error.result})))
                )
            )
        )
    )

    logout$ = createEffect(
        () => this.actions$.pipe(
            ofType(requestLogout),
            switchMap(
                () => this.authService.logout().pipe(
                    map((response) => requestLogoutSuccess({token: response.result}))
                )
            )
        )
    )


    constructor(
        private authService: AuthService,
        private actions$: Actions) {}
}