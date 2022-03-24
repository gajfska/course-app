import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateFacade } from 'src/app/auth/store/auth.facade';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';
import { Course } from '../course/course.model';
import { cloneDeep } from 'lodash';
import { UserStateFacade } from 'src/app/user/store/user.facade';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';
import { combineLatest, of, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  @Input() courses: Course[] = [];
  @Input() areCoursesEditable: boolean = false;

  @Output() editEvent = new EventEmitter<string>();

  showConfirmModalWindow: boolean = false;
  courseIdToDelete?: string;

  courseSubscription: Subscription | undefined;
  authorsSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private coursesFacade: CoursesStateFacade,
    public authFacade: AuthStateFacade,
    public userFacade: UserStateFacade,
    public authorsFacade: AuthorsStateFacade
  ) {
    combineLatest([
      this.coursesFacade.allCourses$,
      this.coursesFacade.courses$,
      this.coursesFacade.isSearchState$,
    ]).subscribe(
      ([allCourses, filteredCourses, isSearching]) =>
        (this.courses = isSearching
          ? cloneDeep(filteredCourses)
          : cloneDeep(allCourses))
    );
  }

  ngOnInit(): void {
    this.coursesFacade.getAllCourses();
    this.authorsFacade.getAuthors();
  }

  ngOnDestroy(): void {
    this.courseSubscription?.unsubscribe();
  }

  reciveModalResultState(result: boolean) {
    this.showConfirmModalWindow = false;
    if (result) {
      this.coursesFacade.deleteCourse(this.courseIdToDelete!);
    }
  }

  reciveSearchWordMessage(searchTitle: string) {
    if (searchTitle) {
      this.coursesFacade.getFilteredCourses(searchTitle);
    } else {
      this.coursesFacade.getAllCourses();
    }
  }

  onAddCourse() {
    this.router.navigate(['courses/add']);
  }

  deleteCourse(id: string) {
    this.courseIdToDelete = id;
    this.showConfirmModalWindow = true;
  }
}
