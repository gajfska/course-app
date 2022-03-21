import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private isAdmin$$ = new BehaviorSubject<boolean>(false);
  private name$$ = new BehaviorSubject<string>("");

  name$: Observable<string> = this.name$$.asObservable();

  get isAdmin$(): boolean {
    return this.isAdmin$$.value;
  }

  constructor(private userService: UserService) { }

  getUser(): void {
    this.userService.getUser().subscribe(user => {
      this.name$$.next(user.name)
      this.isAdmin$$.next(user.role === "admin")
    })
  }
}
