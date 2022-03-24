import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "src/app/user/store/user.reducer";
import { coursesFeatureKey, CoursesState } from "./courses.reducer";


const getCoursesState = createFeatureSelector<CoursesState>(coursesFeatureKey)


export const isAllCoursesLoadingSelector = createSelector(
    getCoursesState,
    (state: CoursesState) => state.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
    getCoursesState,
    (state: CoursesState) => state.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
    getCoursesState,
    (state: CoursesState) => state.isSingleCourseLoading
);

export const getAllCourses = createSelector(
    getCoursesState,
    (state: CoursesState) => state.allCourses
);

export const getCourses = createSelector(
    getCoursesState,
    (state: CoursesState) => state.courses
);

export const getCourse = createSelector(
    getCoursesState,
    (state: CoursesState) => state.course
);

export const getErrorMessage = createSelector(
    getCoursesState,
    (state: CoursesState) => state.errorMessage
);

     