import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { UserStateFacade } from '../store/user.facade';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private userFacade: UserStateFacade, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return this.userFacade.isAdmin$.pipe(
        first(),
        map(isAdmin => {
          if(isAdmin) {
            return true
          } else {
            return this.router.parseUrl('/courses');
          }
        })
      )
  }
}
