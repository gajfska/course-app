import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
