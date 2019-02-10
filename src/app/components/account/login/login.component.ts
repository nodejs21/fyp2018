import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../utils/services/auth/auth.service';
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
  constructor(private _auth: AuthService) {}

  ngOnInit() {}

  async googleLogin() {
    await this._auth.googleLogin();
  }
}
