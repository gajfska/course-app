import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, first, Observable, of, switchMap, tap } from 'rxjs';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthStateFacade } from '../store/auth.facade';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authFacade: AuthStateFacade) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({ url: `${environment.apiUrl}/${request.url}` });

    return this.authFacade.getToken$.pipe(
      first(),
      switchMap((token) => {
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: token,
            },
          });

          return next.handle(request).pipe(
            catchError((error) => {
              if (error.status === 401) {
                this.authFacade.logout();
                this.router.navigate(['login']);
              }
              return of(error);
            })
          );
        } else {
          return next.handle(request);
        }
      })
    );
  }
}
