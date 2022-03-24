import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, Subscription } from 'rxjs';
import { Author } from 'src/app/services/authors.service';
import { authorValidator } from 'src/app/shared/authorValidatorDirective';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit, OnDestroy {
  courseForm!: FormGroup;
  paramsSubscription: Subscription | undefined;
  courseSubscription: Subscription | undefined;
  authorsSubscription: Subscription | undefined;

  courseId?: string;
  authorIds: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private coursesFacade: CoursesStateFacade,
    private authorsFacade: AuthorsStateFacade
  ) {
    let curseTitle = '';

    this.courseForm = new FormGroup({
      title: new FormControl(curseTitle, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required, Validators.min(1)]),
      newAuthor: new FormGroup({
        name: new FormControl('', [authorValidator()]),
      }),
      authors: new FormArray([]),
    });

    this.authorsFacade.addedAuthor$.subscribe((author) => {
      if (author) {
        this.addAuthor(author);
      }
    });

    this.courseSubscription = this.coursesFacade.course$.pipe(filter(v => !!v)).subscribe((data) => {
      if (!data) {
        return;
      }

      this.courseId = data.id;

      this.title?.setValue(data.title);
      this.description?.setValue(data.description);
      this.duration?.setValue(data.duration);

      this.authorIds = data.authors;

    this.authors.controls = []

      this.authorsSubscription = this.authorsFacade.authors$.pipe(first()).subscribe((authors) => {
        this.authorIds.forEach((authorId) => {
          const authorName = authors.find((author) => author.id === authorId)?.name || authorId;
          this.addAuthor({ name: authorName, id: authorId });
        });
      });
    });

  }

  get title() {
    return this.courseForm.get('title');
  }

  get description() {
    return this.courseForm.get('description');
  }

  get duration() {
    return this.courseForm.get('duration');
  }

  get newAuthor() {
    return this.courseForm.get('newAuthor');
  }

  get newAuthorName() {
    return this.newAuthor?.get('name');
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params) => {
      let id = params['id'];

      if (!id) {
        return;
      }

      this.coursesFacade.getSingleCourse(id);
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.courseSubscription?.unsubscribe();
    this.authorsSubscription?.unsubscribe();
  }

  getAuthorControls() {
    return (this.courseForm.get('authors') as FormArray).controls;
  }

  addAuthorItem(): void {
    let newAuthorName: string = this.newAuthorName?.value;

    this.authorsFacade.addAuthor({ name: newAuthorName });
  }

  private addAuthor(author: Author): void {
    let authorTemplate = new FormGroup({
      name: new FormControl({ value: author.name, disabled: true }),
      id: new FormControl({ value: author.id }),
    });

    this.authors.push(authorTemplate);
  }

  removeAuthorItem(index: number): void {
    this.authors.removeAt(index);
  }

  save(): void {
    let authorIds = this.authors.value.map((author: any) => author.id.value);

    const wholeCourse = { ...this.courseForm.value, authors: authorIds };

    if (this.courseId) {
      this.coursesFacade.editCourse(wholeCourse, this.courseId);
    } else {
      this.coursesFacade.createCourse(wholeCourse);
    }
  }

  doneButtonTitle(): string {
    return !!this.courseId ? 'Edit course' : 'Create course';
  }
}
