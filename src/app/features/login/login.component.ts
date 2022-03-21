import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email: "",
    password: ""
  };
  
  constructor() { }

  ngOnInit(): void {
  }

  onSubmitFunc(form: NgForm) {
    const value = form.value;
    console.log(form)
  }

}
