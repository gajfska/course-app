import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { ApiResponse } from 'src/app/services/courses.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

export interface User {
  email: string;
  id: string;
  name: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);

  get isAuthorized$(): boolean {
    return this.isAuthorized$$.value;
  }

  constructor(
    private http: HttpClient,
    private sessionSorage: SessionStorageService,
    private router: Router
  ) {
    this.isAuthorized$$.next(sessionSorage.getToken() !== '');
  }

  login(login: User) {
    this.http.post<ApiResponse<string>>('login', login).subscribe(
      (response) => {
        this.sessionSorage.setToken(response.result);
        this.isAuthorized$$.next(true);

        this.router.navigate(['courses']);
      },
      (err) => {
        let errorContent = err.error as ApiResponse<string>;
        alert(errorContent.errors.join(',"'));
      }
    );
  }

  logout() {
    this.http.delete('login');
  }

  register(register: User) {
    this.http.post('login', register);
  }
}
