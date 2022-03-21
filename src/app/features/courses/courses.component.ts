import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { UserStoreService } from 'src/app/user/services/user-store.service';
import { Course } from '../course/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  @Input() courses: Course[] = [];
  @Input() areCoursesEditable: boolean = false;

  @Output() editEvent = new EventEmitter<string>();

  showConfirmModalWindow: boolean = false;
  courseIdToDelete?: string;

  constructor(
    private router: Router,
    private coursesStore: CoursesStoreService,
    public userStore: UserStoreService
  ) {
    this.coursesStore.courses$.subscribe((courses) => (this.courses = courses));
  }

  ngOnInit(): void {
    this.coursesStore.getAll();
    this.userStore.getUser();
  }

  reciveModalResultState(result: boolean) {
    this.showConfirmModalWindow = false;
    if (result) {
      this.coursesStore.deleteCourse(this.courseIdToDelete!);
    }
  }

  reciveSearchWordMessage(searchTitle: string) {
    if (searchTitle) {
      this.coursesStore.filterCourses(searchTitle);
    } else {
      this.coursesStore.getAll();
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
