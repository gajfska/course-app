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
  constructor(private http: HttpClient) {}

  login(login: User): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>('login', login);
  }

  logout(): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>('login');
  }

  register(register: User): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>('login', register);
  }
}
