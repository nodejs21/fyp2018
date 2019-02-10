import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './../../../utils/validators/confirm-password.validator';
import { AuthService } from '../../../utils/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
    // FormBuilder
  ]
})
export class SignupComponent implements OnInit {
  basicUserForm: FormGroup;
  specificUserForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _auth: AuthService) {
    this._auth.user.subscribe(user => {
      console.log(user);
      const splitName = user.displayName.split(' ');
      this.basicUserForm.get('firstName').setValue(splitName[0]);
      this.basicUserForm.get('lastName').setValue(splitName[1]);
      this.basicUserForm.get('imageUrl').setValue(user.photoURL);
      this.basicUserForm.get('email').setValue(user.email);
    });
  }

  ngOnInit() {
    this.basicUserForm = this._formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        imageUrl: ['./../../../../assets/img/avatars/8.jpg'],
        gender: [true],
        userType: ['teacher'.toLowerCase()],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: ConfirmPasswordValidator.MatchPassword
      }
    );
  }

  async googleLogin() {
    await this._auth.googleLogin();
  }

  printValues() {
    console.log(this.basicUserForm);
    console.log(this.basicUserForm.value);
    console.log(JSON.stringify(this.basicUserForm.value, undefined, 2));
  }
}
