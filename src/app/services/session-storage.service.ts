import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private window: Window;
  private sessionStorage: Storage; 

  private tokenKey = "Token"


  constructor(@Inject(DOCUMENT) private document: Document) {
     this.window = this.document.defaultView!;
     this.sessionStorage = this.window.sessionStorage;
  }

  setToken(token: string) {
    this.sessionStorage.setItem(this.tokenKey, token);
  }

  getToken(): string {
    return this.sessionStorage.getItem(this.tokenKey) || "";
  }

  deleteToken(){
    this.sessionStorage.removeItem(this.tokenKey)
  }
}
