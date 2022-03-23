import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Author, AuthorsService } from './authors.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorsStoreService {
  private isLoading$$ = new BehaviorSubject<Boolean>(false);
  private authors$$ = new BehaviorSubject<Author[]>([]);

  isLoading$: Observable<Boolean> = this.isLoading$$.asObservable();
  authors$: Observable<Author[]> = this.authors$$.asObservable();

  constructor(private authorsService: AuthorsService) {}

  getAll() {
    this.isLoading$$.next(true);

    this.authorsService.getAll().subscribe((authors) => {
      this.authors$$.next(authors);
      this.isLoading$$.next(false);
    });
  }

  addAuthor(author: Author): Observable<Author> {
    this.isLoading$$.next(true);

    return this.authorsService.addAuthor(author).pipe(
      tap((_) => {
        this.isLoading$$.next(false);
      })
    );
  }

  getAuthor(id: string): Observable<Author> {
    this.isLoading$$.next(true);

    return this.authorsService.getAuthor(id).pipe(
      tap((_) => {
        this.isLoading$$.next(false);
      })
    );
  }
}
