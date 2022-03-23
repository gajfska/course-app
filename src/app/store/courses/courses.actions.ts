import { createAction } from "@ngrx/store";


export const requestAllCourses = createAction('requestAllCourses');
export const requestAllCoursesSuccess = createAction('requestAllCoursesSuccess');
export const requestAllCoursesFail = createAction('requestAllCoursesFail');
export const requestSingleCourse = createAction('requestSingleCourse');
export const requestSingleCourseSuccess = createAction('requestSingleCourseSuccess');
export const requestSingleCourseFail = createAction('requestSingleCourseFail');
export const requestFilteredCourses = createAction('requestFilteredCourses');
export const requestFilteredCoursesSuccess = createAction('requestFilteredCoursesSuccess');
export const requestDeleteCourse = createAction('requestDeleteCourse');
export const requestDeleteCourseFail = createAction('requestDeleteCourseFail');
export const requestEditCourse = createAction('requestEditCourse');
export const requestEditCourseSuccess = createAction('requestEditCourseSuccess');
export const requestEditCourseFail = createAction('requestEditCourseFail');
export const requestCreateCourse = createAction('requestCreateCourse');
export const requestCreateCourseSuccess = createAction('requestCreateCourseSuccess');
export const requestCreateCourseFail = createAction('requestCreateCourseFail');         