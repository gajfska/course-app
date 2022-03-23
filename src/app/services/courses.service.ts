import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../features/course/course.model';

export interface ApiResponse<T> {
  successful: boolean;
  result: T;
  errors: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Course[]> {
    return this.http.get<ApiResponse<Course[]>>('courses/all').pipe(
      map((el) => {
        let courses: Course[] = el.result;
        return courses.filter((course) => {
          if (course.authors.length > 0) {
            return typeof course.authors[0] === 'string';
          } else {
            return false;
          }
        });
      })
    );
  }

  createCourse(course: Course) {
    return this.http.post('courses/add', course);
  }

  editCourse(id: string, course: Course): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(`courses/${id}`, course);
  }

  getCourse(id: string): Observable<Course> {
    return this.http
      .get<ApiResponse<Course>>(`courses/${id}`)
      .pipe(map((e) => e.result));
  }

  deleteCourse(id: string): Observable<Course> {
    return this.http
      .delete<ApiResponse<Course>>(`courses/${id}`)
      .pipe(map((e) => e.result));
  }

  filterCourses(title: string): Observable<Course[]> {
    let params = new HttpParams();
    params = params.append('title', title);

    return this.http
      .get<ApiResponse<Course[]>>('courses/filter', { params: params })
      .pipe(map((e) => e.result));
  }
}
