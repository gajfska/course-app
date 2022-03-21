import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { CourseEditModule } from './features/course/course-edit/course-edit.module';
import { CoursesModule } from './features/courses/courses.module';
import { LoginModule } from './features/login/login.module';
import { RegistrationModule } from './features/registration/registration.module';
import { APIInterceptor } from './shared/baseUrl.interceptor';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoursesModule,
    LoginModule,
    RegistrationModule,
    CourseEditModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    AuthorizedGuard,
    {      
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true  
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
