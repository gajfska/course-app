import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { AuthorsStoreService } from 'src/app/services/authors-store.service';
import { Author } from 'src/app/services/authors.service';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { Course } from './course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  @Input() course: Course = {
    title: '',
    description: '',
    id: '',
    creationDate: new Date(),
    duration: 0,
    authors: [],
  };

  paramsSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private coursesStoreService: CoursesStoreService,
    private authorsStore: AuthorsStoreService
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params) => {
      let id = params['id'];
      if (!id) {
        this.changeIdToNames();
        return;
      }

      this.coursesStoreService.getCourse(id).subscribe((data) => {
        this.course = data;
        this.changeIdToNames();
      });
    });
  }

  changeIdToNames() {
    let authorIds = this.course.authors;
    let authorGetterObservables: Observable<Author>[] = [];

    while (authorIds.length > 0) {
      authorGetterObservables.push(
        this.authorsStore.getAuthor(authorIds.pop()!)
      );
    }

    forkJoin(authorGetterObservables).subscribe(
      (authors) => (this.course.authors = authors.map((author) => author.name))
    );
  }
}
