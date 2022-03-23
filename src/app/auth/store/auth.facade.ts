import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { User } from "../services/auth.service";
import { requestLogin, requestLoginSuccess, requestLogout, requestLogoutSuccess, requestRegister } from "./auth.actions";
import { AuthState } from "./auth.reducer";
import { getSpecificErrorMessage, getToken, isUserAuthorized } from "./auth.selectors";


@Injectable({
    providedIn: 'root',
  })
export class AuthStateFacade {

    constructor(private store: Store<AuthState>){}

    isAuthorized$ = this.store.select(isUserAuthorized)
    getToken$ = this.store.select(getToken);
    getRegisterErrorMessage$ = this.store.select(getSpecificErrorMessage);
    getLoginErrorMessage$ = this.store.select(getSpecificErrorMessage);

    // getCurrentUser(): void {
    //     this.store.dispatch(requestLogin())
    // }

    login(body: User) {
        this.store.dispatch(requestLogin(body))
    }
    
    // register(body: User) {
    //     requestRegister({
    //     body}) 
    // }
        
    //     logout() {
    //         requestLogout 
    //     }
        
    //     closeSession() {
    //         requestLogoutSuccess 
    //     }
        
    //     setAuthorization() {
    //         requestLoginSuccess({ token: sessionStorage.getToken() })
    //     }

}