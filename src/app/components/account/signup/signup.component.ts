import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './../../../utils/validators/confirm-password.validator';

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
  specificDataForm: FormGroup;

  basicUserForm: FormGroup;
  specificUserForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.specificDataForm = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.basicUserForm = this._formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        imageUrl: [''],
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

  printValues() {
    console.log(this.basicUserForm);
    console.log(this.basicUserForm.value);
    console.log(JSON.stringify(this.basicUserForm.value, undefined, 2));
  }
}
