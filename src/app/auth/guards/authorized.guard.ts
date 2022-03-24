import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { AuthStateFacade } from '../store/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanLoad {
  constructor(private authFacade: AuthStateFacade, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authFacade.isAuthorized$.pipe(
      first(),
      map((value) => {
        if (value) {
          return true;
        } else {
          return this.router.parseUrl('/login');
        }
      })
    );
  }
}
