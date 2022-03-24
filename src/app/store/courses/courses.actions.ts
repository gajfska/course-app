import { createAction, props } from "@ngrx/store";
import { Course } from "src/app/features/course/course.model";


export const requestAllCourses = createAction('requestAllCourses');
export const requestAllCoursesSuccess = createAction('requestAllCoursesSuccess', props<{allCourses: Course[]}>());
export const requestAllCoursesFail = createAction('requestAllCoursesFail', props<{message: string}>());

export const requestSingleCourse = createAction('requestSingleCourse', props<{id: string}>());
export const requestSingleCourseSuccess = createAction('requestSingleCourseSuccess', props<{course: Course}>());
export const requestSingleCourseFail = createAction('requestSingleCourseFail', props<{message: string}>());

export const requestFilteredCourses = createAction('requestFilteredCourses', props<{searchValue: string}>());
export const requestFilteredCoursesSuccess = createAction('requestFilteredCoursesSuccess',props<{courses: Course[]}>());

export const requestDeleteCourse = createAction('requestDeleteCourse', props<{id: string}>());
export const requestDeleteCourseFail = createAction('requestDeleteCourseFail');

export const requestEditCourse = createAction('requestEditCourse', props<{id: string, body: Course}>());
export const requestEditCourseSuccess = createAction('requestEditCourseSuccess');
export const requestEditCourseFail = createAction('requestEditCourseFail');

export const requestCreateCourse = createAction('requestCreateCourse', props<{body: Course}>());
export const requestCreateCourseSuccess = createAction('requestCreateCourseSuccess');
export const requestCreateCourseFail = createAction('requestCreateCourseFail');         