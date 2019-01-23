import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../utils/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
  }

  googleLogin() {
    return this.auth.googleLogin();
  }
}
