import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorsStoreService } from 'src/app/services/authors-store.service';
import { Author } from 'src/app/services/authors.service';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { authorValidator } from 'src/app/shared/authorValidatorDirective';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit {
  courseForm!: FormGroup;
  paramsSubscription: Subscription | undefined;

  courseId?: string;
  authorIds: string[] = [];

  constructor(
    private authorsStore: AuthorsStoreService,
    private courseStore: CoursesStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private coursesStoreService: CoursesStoreService
  ) {}

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

    this.paramsSubscription = this.route.params.subscribe((params) => {
      let id = params['id'];
      if (!id) {
        return;
      }
      this.coursesStoreService.getCourse(id).subscribe((data) => {
        this.courseId = data.id;

        this.title?.setValue(data.title);
        this.description?.setValue(data.description);
        this.duration?.setValue(data.duration);

        this.authorIds = data.authors;

        for (let authorId of data.authors) {
          this.fetchAndSetAuthorItem(authorId);
        }
      });
    });
  }

  getAuthorControls() {
    return (this.courseForm.get('authors') as FormArray).controls;
  }

  private fetchAndSetAuthorItem(id: string): void {
    this.authorsStore
      .getAuthor(id)
      .subscribe((author) => this.addAuthor(author));
  }

  addAuthorItem(): void {
    let newAuthorName: string = this.newAuthorName?.value;

    this.authorsStore.addAuthor({ name: newAuthorName }).subscribe((author) => {
      this.addAuthor(author);
    });
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
      this.coursesStoreService.editCourse(this.courseId, wholeCourse);
    } else {
      this.courseStore.createCourse(wholeCourse);
    }
    this.router.navigate(['curses']);
  }

  doneButtonTitle(): string {
    return !!this.courseId ? 'Edit course' : 'Create course';
  }
}
