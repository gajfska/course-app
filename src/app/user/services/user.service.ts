import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/auth/services/auth.service';
import { ApiResponse } from 'src/app/services/courses.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<ApiResponse<User>>('users/me').pipe(map(e => e.result))
  }
}
