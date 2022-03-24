import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Author } from "src/app/services/authors.service";
import { requestAddAuthors, requestAuthors, requestSingleAuthor } from "./authors.actions";
import { getAddedAuthors, getAuthors,  } from "./authors.selector";

@Injectable({
    providedIn: 'root',
  })
  export class AuthorsStateFacade {
      
    constructor(private store: Store){}

    addedAuthor$ = this.store.select(getAddedAuthors);
    authors$ = this.store.select(getAuthors);

    getAuthors(): void {
        this.store.dispatch(requestAuthors())
    }

    addAuthor(author: Author) {
      this.store.dispatch(requestAddAuthors(author))
    }
    
  }
