import { Action } from "@ngrx/store";
import { Course } from "src/app/features/course/course.model"


const coursesFeatureKey = {}


export interface CoursesState {
    allCourses: Course[];
    courses: Course[];
    course: Course;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean; 
    isSearchState: boolean; 
    errorMessage: string;
}

const initialState: CoursesState= {
    allCourses: [], 
    courses: [], 
    course: '', 
    isAllCoursesLoading: true,
    isSingleCourseLoading: true,
    isSearchState: true,
    errorMessage: ''}

    // export const coursesReducer = (state:
    //     CoursesState, action: Action): CoursesState => reducer(state,
    //     action);