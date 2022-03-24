import { Action, createReducer, on } from "@ngrx/store";
import { Course } from "src/app/features/course/course.model"
import { requestCurrentUserSuccess, requestCurrentUserFail } from "src/app/user/store/user.actions";
import { UserState } from "src/app/user/store/user.reducer";
import { requestAllCoursesFail, requestAllCoursesSuccess, requestDeleteCourse, requestEditCourseSuccess, requestFilteredCoursesSuccess, requestSingleCourseSuccess } from "./courses.actions";


export const coursesFeatureKey = "CoursesStore"


export interface CoursesState {
    // all courses for list
    allCourses: Course[];
    // filtered courses from search
    courses: Course[];
    // get single course response
    course?: Course;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean; 
    // is search or all courses displayed
    isSearchState: boolean; 
    // any error message
    errorMessage: string;
}

const initialState: CoursesState= {
    allCourses: [], 
    courses: [], 
    course: undefined, 
    isAllCoursesLoading: true,
    isSingleCourseLoading: true,
    isSearchState: true,
    errorMessage: ''}

    const _coursesReducer = createReducer(
        initialState,
        on(requestAllCoursesSuccess, (state, response) => {
            return { ...state,
                isSearchState: false,
                allCourses: response.allCourses
            }
        }),
        on(requestSingleCourseSuccess, (state, response) => {
            return { ...state,
                course: response.course
            }
        }),
        on(requestFilteredCoursesSuccess, (state, response) => {
            return { ...state,
                isSearchState: true,
                courses: response.courses
            }
        }),
        on(requestAllCoursesFail, (state) => state)
    );
    
    export const coursesReducer = (state: CoursesState | undefined, action: Action): CoursesState => _coursesReducer(state, action);