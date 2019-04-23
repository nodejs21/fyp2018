import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../utils/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagingService } from '../../../utils/services/messaging.service';
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
  btnLoginDisable = false;
  constructor(
    private _auth: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private msgService: MessagingService
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
    this.btnLoginDisable = true;
    this._auth
      .signIn(this.email.value, this.password.value)
      .then(({ user }) => {
        this.msgService.getPermission(user);
        this.msgService.monitorRefresh(user);
        this.msgService.receiveMessage();
        this.btnLoginDisable = false;
        console.log(user, 'UUSSRR');
      })
      .catch(err => {
        console.error(err);
        this.error = err;
        this.btnLoginDisable = false;
      });
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.login();
      // rest of your code
    }
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  // signIn() {}
}
