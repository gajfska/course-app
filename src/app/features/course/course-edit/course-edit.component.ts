import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { authorValidator } from "src/app/shared/authorValidatorDirective";

@Component({
  selector: "app-course-edit",
  templateUrl: "./course-edit.component.html",
  styleUrls: ["./course-edit.component.scss"],
})
export class CourseEditComponent implements OnInit {

  courseForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  get title() { return this.courseForm.get('title'); }

  get description() { return this.courseForm.get('description'); }

  get duration() { return this.courseForm.get('duration'); }

  get newAuthor() { return this.courseForm.get('newAuthor'); }

  get newAuthorName() { return this.newAuthor?.get('authorName'); }

  get authors(): FormArray { return this.courseForm.get('authors') as FormArray; }

  ngOnInit(): void {
    this.courseForm = new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl("", [
        Validators.required, 
      ]),
      duration: new FormControl("", [
        Validators.required, 
        Validators.min(1)
      ]),
      newAuthor: new FormGroup({
        authorName: new FormControl("", [
          authorValidator()
        ]),
      }),
      authors: new FormArray([]),
    });
  }

  getAuthorControls() {
    return (this.courseForm.get("authors") as FormArray).controls;
  }

  createAuthor(name?: string): FormGroup {
    return this.fb.group({
      authorName: [name],
    });
  }

  addAuthorItem(): void {
    let newAuthorName: string = this.newAuthorName?.value;

    let authorTemplate = new FormGroup({
      authorName: new FormControl(
        { value: newAuthorName, disabled: true },
        Validators.required
      ),
    });

    this.authors.push(authorTemplate);
  }

  removeAuthorItem(index: any): void {
    this.authors.removeAt(index);
  }

  save() {
    console.log(this.courseForm.value);
  }
}
