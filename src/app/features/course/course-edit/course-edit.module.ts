import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseEditComponent } from './course-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CourseEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CourseEditComponent
  ]
})
export class CourseEditModule { }
