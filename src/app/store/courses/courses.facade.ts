import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Course } from "src/app/features/course/course.model";
import { requestAllCourses, requestCreateCourse, requestDeleteCourse, requestEditCourse, requestFilteredCourses, requestSingleCourse } from "./courses.actions";
import { getAllCourses, getCourse, getCourses, isSearchingStateSelector } from "./courses.selector";

@Injectable({
    providedIn: 'root',
  })
  export class CoursesStateFacade {

    constructor(private store: Store){}

    courses$ = this.store.select(getCourses)
    allCourses$ = this.store.select(getAllCourses)
    course$ = this.store.select(getCourse)
    isSearchState$ = this.store.select(isSearchingStateSelector)

    getAllCourses() {
        this.store.dispatch(requestAllCourses())
    }
    
    getSingleCourse(id: string){
        this.store.dispatch(requestSingleCourse({ id }))
    }

    getFilteredCourses(searchValue: string){
        this.store.dispatch(requestFilteredCourses({ searchValue }))
    }
    
    editCourse(body: Course, id: string) {
        this.store.dispatch(requestEditCourse({ body, id }))
    }
    
    createCourse(body: Course) {
        this.store.dispatch(requestCreateCourse({ body }))
    }
    
    deleteCourse(id: string) {
        this.store.dispatch(requestDeleteCourse({ id }))
    }

}