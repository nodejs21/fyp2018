import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../utils/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  // providers: [{
  //   provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  // }]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: any = false;
  constructor(
    private _auth: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this._auth.user.subscribe(user => {
      console.log(user);

      if (user) {
        this._router.navigate([`/${user['userType']}`]);
      }
    });
  }

  async googleLogin() {
    await this._auth.googleLogin();
  }

  login() {
    this._auth
      .signIn(this.email.value, this.password.value)
      .then(user => {
        console.log(user);
      })
      .catch(err => {
        console.error(err);
        this.error = err;
      });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  // signIn() {}
}
