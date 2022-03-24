import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { User } from '../services/auth.service';
import {
  requestLogin,
  requestLoginSuccess,
  requestLogout,
  requestLogoutSuccess,
  requestRegister,
} from './auth.actions';
import { AuthState } from './auth.reducer';
import {
  getSpecificErrorMessage,
  getToken,
  isUserAuthorized,
} from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthStateFacade {
  constructor(
    private store: Store<AuthState>,
    private sessionStorage: SessionStorageService
  ) {}

  isAuthorized$ = this.store.pipe(select(isUserAuthorized));

  getToken$ = this.store.pipe(select(getToken));
  getRegisterErrorMessage$ = this.store.pipe(select(getSpecificErrorMessage), filter(v => !!v));
  getLoginErrorMessage$ = this.store.pipe(select(getSpecificErrorMessage), filter(v => !!v));

  login(body: User) {
    this.store.dispatch(requestLogin(body));
  }

  register(body: User) {
    this.store.dispatch(requestRegister(body));
  }

  logout() {
    this.store.dispatch(requestLogout());
  }

  closeSession() {
    // this.store.dispatch(requestLogoutSuccess());
  }

  setAuthorization() {
    this.store.dispatch(
      requestLoginSuccess({ token: this.sessionStorage.getToken() })
    );
  }
}
