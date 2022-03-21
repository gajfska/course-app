import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, User } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user = {
    email: "",
    password: ""
  };

  constructor(private authService: AuthService,) { }


  onSubmitFunc(form: NgForm) {
    const userDetails = form.value as User;
    this.authService.login(userDetails);
  }

}
