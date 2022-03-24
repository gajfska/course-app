import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, of, filter, tap, first } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';
import {
  requestAllCourses,
  requestAllCoursesFail,
  requestAllCoursesSuccess,
  requestCreateCourse,
  requestCreateCourseFail,
  requestCreateCourseSuccess,
  requestDeleteCourse,
  requestDeleteCourseFail,
  requestEditCourse,
  requestEditCourseFail,
  requestEditCourseSuccess,
  requestFilteredCourses,
  requestFilteredCoursesSuccess,
  requestSingleCourse,
  requestSingleCourseFail,
  requestSingleCourseSuccess,
} from './courses.actions';
import { CoursesStateFacade } from './courses.facade';

@Injectable()
export class CoursesEffects {
  getAllCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAllCourses),
      switchMap(() =>
        this.coursesService.getAll().pipe(
          map((courses) => requestAllCoursesSuccess({ allCourses: courses })),
          catchError((error) =>
            of(requestAllCoursesFail({ message: error.error.result }))
          )
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestFilteredCourses),
      switchMap((body) =>
        this.coursesFacade.allCourses$.pipe(
          first(),
          map((courses) => {
            let filteredCourses = courses.filter((course) => course.title.includes(body.searchValue));
            return requestFilteredCoursesSuccess({ courses: filteredCourses });
          })
        )
      )
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestSingleCourse),
      switchMap((body) =>
        this.coursesService.getCourse(body.id).pipe(
          map((course) => requestSingleCourseSuccess({ course: course })),
          catchError((error) =>
            of(requestSingleCourseFail({ message: error.error.result }))
          )
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestDeleteCourse),
      switchMap((request) =>
        this.coursesService.deleteCourse(request.id).pipe(
          map(() => requestAllCourses()),
          catchError(() => of(requestDeleteCourseFail))
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestEditCourse),
      switchMap((request) =>
        this.coursesService.editCourse(request.id, request.body).pipe(
          map(() => requestEditCourseSuccess()),
          catchError(() => of(requestEditCourseFail))
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestCreateCourse),
      switchMap((request) =>
        this.coursesService.createCourse(request.body).pipe(
          map(() => requestCreateCourseSuccess()),
          catchError(() => of(requestCreateCourseFail))
        )
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          requestCreateCourseSuccess,
          requestEditCourseSuccess,
          requestSingleCourseFail
        ),
        tap(() => this.router.navigate(['courses']))
      ),
    { dispatch: false }
  );

  constructor(
    private coursesFacade: CoursesStateFacade,
    private coursesService: CoursesService,
    private actions$: Actions,
    private router: Router
  ) {}
}
