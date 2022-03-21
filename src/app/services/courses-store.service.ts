import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Course } from '../features/course/course.model';
import { AuthorsStoreService } from './authors-store.service';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {

  private isLoading$$ = new BehaviorSubject<Boolean>(false);
  private courses$$ = new BehaviorSubject<Course[]>([]);


  isLoading$: Observable<Boolean> = this.isLoading$$.asObservable();
  courses$: Observable<Course[]> = this.courses$$.asObservable();

  constructor(private coursesService: CoursesService, private authorsStore: AuthorsStoreService) { }


  getAll() {
    this.isLoading$$.next(true)

    this.coursesService.getAll().subscribe(courses => {
      this.courses$$.next(courses)
      this.isLoading$$.next(false)
    })
  }

  createCourse(course: Course) {
    this.isLoading$$.next(true)

    this.coursesService.createCourse(course).subscribe(_ => {
      this.isLoading$$.next(false)
    }, err => {
      console.log(err)
    })
  }

  editCourse(id: string, course: Course): void {
    this.isLoading$$.next(true)

    this.coursesService.editCourse(id, course).subscribe(_ => {
      this.isLoading$$.next(false)
    }, err => {
      console.log(err)
    })
  }

  deleteCourse(id: string) {
    this.isLoading$$.next(true)

    this.coursesService.deleteCourse(id).subscribe(_ => {
      this.isLoading$$.next(false)
      this.getAll();
    }, err => {
      console.log(err)
    })
  }

  getCourse(id: string): Observable<Course> {
    this.isLoading$$.next(true)

    return this.coursesService.getCourse(id).pipe(tap((_ => {
      this.isLoading$$.next(false)
    })))
  }

  filterCourses(title: string) {
    this.isLoading$$.next(true)

    this.coursesService.filterCourses(title).subscribe(courses => {
      this.courses$$.next(courses)
      this.isLoading$$.next(false)
    })
  }

}
