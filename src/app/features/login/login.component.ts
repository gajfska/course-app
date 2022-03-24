import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { User } from 'src/app/auth/services/auth.service';
import { AuthStateFacade } from 'src/app/auth/store/auth.facade';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: User = {
    email: '',
    password: '',
    id: '',
    name: '',
    role: '',
  };

  constructor(private authFacade: AuthStateFacade, private sessionStorage: SessionStorageService, private router: Router) {
    authFacade.setAuthorization();

    this.authFacade.getToken$.pipe(filter(v => !!v)).subscribe((token) => {
      if(token) {
        this.sessionStorage.setToken(token)
        this.router.navigate(['courses'])
      }
    }
    );

    this.authFacade.getLoginErrorMessage$.subscribe((errorMsg) =>
      alert(errorMsg)
    );
  }

  onSubmitFunc(form: NgForm) {
    const userDetails = form.value as User;

    this.authFacade.login(userDetails);
  }
}
