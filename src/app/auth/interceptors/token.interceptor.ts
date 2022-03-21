import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private sessionSorage: SessionStorageService, private router: Router, private sessioStorage: SessionStorageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({ url: `${environment.apiUrl}/${request.url}` });

    if (this.sessionSorage.getToken() === "") {
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        Authorization: this.sessionSorage.getToken()
      }
    });

    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.sessioStorage.deleteToken();
          this.router.navigate(['login']);
        }
        return of(error)
      })
    );
  }
}
