import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import { Subscription } from 'rxjs';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';
import { Course } from './course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, OnDestroy {
  @Input() course: Course = {
    title: '',
    description: '',
    id: '',
    creationDate: new Date(),
    duration: 0,
    authors: [],
  };

  paramsSubscription: Subscription | undefined;
  courseSubscription: Subscription | undefined;
  authorsSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private coursesFacade: CoursesStateFacade,
    private authorsFacade: AuthorsStateFacade
  ) {
    this.courseSubscription = this.coursesFacade.course$.subscribe((data) => {
      if(data) {
      this.course = cloneDeep(data);
      this.changeIdToNames();
      }
    });
  }

  ngOnInit(): void {

    this.paramsSubscription = this.route.params.subscribe((params) => {
      let id = params['id'];

      if (!id) {
        this.changeIdToNames();
        return;
      }

      this.coursesFacade.getSingleCourse(id)
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.courseSubscription?.unsubscribe();
    this.authorsSubscription?.unsubscribe();
  }

  changeIdToNames() {
    this.authorsSubscription = this.authorsFacade.authors$.subscribe((authors) => {
      let authorIds = [ ...this.course.authors ];

      let authorsNames = authorIds.map(id => authors.find(author => author.id === id)?.name || id)
      this.course.authors = authorsNames
    })
  }
}