import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthStateFacade } from '../store/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class NotAuthorizedGuard implements CanActivate {
  constructor(private authFacade: AuthStateFacade, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    return this.authFacade.isAuthorized$.pipe(
      first(),
      map( value => {
        if (value) {
          return this.router.parseUrl('/courses'); 
        } else {
          return true;
        }
      })
    )
  }
}
