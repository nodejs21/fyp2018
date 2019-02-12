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
  academyDetailsForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _auth: AuthService) {
    this._auth.user.subscribe(user => {
      console.log(user);
      if (user) {
        const splitName = user.displayName.split(' ');
        this.firstName.setValue(splitName[0]);
        this.lastName.setValue(splitName[1]);
        this.imageUrl.setValue(user.photoURL);
        this.email.setValue(user.email);
      }
    });
  }

  ngOnInit() {
    this.basicUserForm = this._formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        imageUrl: ['./../../../../assets/img/avatars/8.jpg'],
        gender: [true],
        userType: ['teacher'.toLowerCase()],
        password: ['jjjjjj', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['jjjjjj', Validators.required]
      },
      {
        validators: ConfirmPasswordValidator.MatchPassword
      }
    );
    this.specificUserForm = this._formBuilder.group({
      dob: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      telephone: ['', Validators.required],
      qualification: ['']
    });
    this.academyDetailsForm = this._formBuilder.group({
      academyName: ['', Validators.required],
      academyDescription: ['', Validators.required]
    });
  }

  signUp() {
    const user: any = {
      userBasicInfo: this.basicUserForm.value,
      userSpecificInfo: this.specificUserForm.value,
      academyDetails: this.academyDetailsForm.value
    };
    console.log(user);
    this._auth.customSignUp(user);
  }

  async googleLogin() {
    await this._auth.googleLogin();
  }

  async facebookLogin() {
    await this._auth.facebookLogin();
  }

  printValues() {
    console.log(this.basicUserForm);
    console.log(this.basicUserForm.value);
    console.log(JSON.stringify(this.basicUserForm.value, undefined, 2));
  }

  get firstName() {
    return this.basicUserForm.get('firstName');
  }
  get lastName() {
    return this.basicUserForm.get('lastName');
  }
  get email() {
    return this.basicUserForm.get('email');
  }
  get imageUrl() {
    return this.basicUserForm.get('imageUrl');
  }
  get gender() {
    return this.basicUserForm.get('gender');
  }
  get userType() {
    return this.basicUserForm.get('userType');
  }
  get password() {
    return this.basicUserForm.get('password');
  }
  get confirmPassword() {
    return this.basicUserForm.get('confirmPassword');
  }
  get dob() {
    return this.specificUserForm.get('dob');
  }
  get address() {
    return this.specificUserForm.get('address');
  }
  get city() {
    return this.specificUserForm.get('city');
  }
  get telephone() {
    return this.specificUserForm.get('telephone');
  }
  get qualification() {
    return this.specificUserForm.get('qualification');
  }
  get academyName() {
    return this.academyDetailsForm.get('academyName');
  }
  get academyDescription() {
    return this.academyDetailsForm.get('academyDescription');
  }
}
