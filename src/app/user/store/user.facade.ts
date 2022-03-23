import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { requestCurrentUser } from "./user.actions";
import { getName, isAdmin } from "./user.selectors";

@Injectable()
export class UserStateFacade {

    constructor(private store: Store){}

    name$ = this.store.select(getName);
    isAdmin$ = this.store.select(isAdmin);

    getCurrentUser(): void {
        this.store.dispatch(requestCurrentUser())
    }

}