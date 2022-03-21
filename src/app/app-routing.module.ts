import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { CourseEditComponent } from './features/course/course-edit/course-edit.component';
import { CourseComponent } from './features/course/course.component';
import { CoursesComponent } from './features/courses/courses.component';
import { LoginComponent } from './features/login/login.component';
import { RegistrationComponent } from './features/registration/registration.component';
import { UserGuard } from './user/guard/user.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
    component: LoginComponent,
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./features/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
    component: RegistrationComponent,
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./features/courses/courses.module').then((m) => m.CoursesModule),
    component: CoursesComponent,
    canLoad: [AuthorizedGuard],
  },
  {
    path: 'courses/add',
    loadChildren: () =>
      import('./features/course/course-edit/course-edit.module').then(
        (m) => m.CourseEditModule
      ),
    component: CourseEditComponent,
    canLoad: [AuthorizedGuard],
    canActivate: [UserGuard],
  },
  {
    path: 'courses/:id',
    loadChildren: () =>
      import('./features/course/course.module').then((m) => m.CourseModule),
    component: CourseComponent,
    canLoad: [AuthorizedGuard],
  },
  {
    path: 'courses/edit/:id',
    loadChildren: () =>
      import('./features/course/course-edit/course-edit.module').then(
        (m) => m.CourseEditModule
      ),
    component: CourseEditComponent,
    canLoad: [AuthorizedGuard],
    canActivate: [UserGuard],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
