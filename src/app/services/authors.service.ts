import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from './courses.service';

export interface Author {
  name: string;
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Author[]> {
    return this.http
      .get<ApiResponse<Author[]>>('authors/all')
      .pipe(map((e) => e.result));
  }

  addAuthor(author: Author): Observable<Author> {
    return this.http
      .post<ApiResponse<Author>>('authors/add', author)
      .pipe(map((e) => e.result));
  }

  getAuthor(id: string): Observable<Author> {
    return this.http
      .get<ApiResponse<Author>>(`authors/${id}`)
      .pipe(map((e) => e.result));
  }

  editAuthor(author: any) {
    return this.http.put('authors/{id}', author);
  }

  deleteAuthor() {
    return this.http.delete('authors/{id}');
  }
}
