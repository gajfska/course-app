import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseModule } from '../course/course.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CoursesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CourseModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    CoursesComponent
  ]
})

export class CoursesModule { }
