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

  constructor(private _formBuilder: FormBuilder, private _auth: AuthService) {}

  ngOnInit() {
    this.basicUserForm = this._formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        photoURL: ['./../../../../assets/img/avatars/8.jpg'],
        gender: [true],
        userType: ['teacher'.toLowerCase()],
        password: ['jjjjjj', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['jjjjjj', Validators.required]
      },
      {
        validators: [ConfirmPasswordValidator.MatchPassword]
      }
    );
    this.specificUserForm = this._formBuilder.group({
      dob: ['2019-02-07', Validators.required],
      address: ['876545678', [Validators.required, Validators.minLength(5)]],
      city: ['87654567', [Validators.required, Validators.minLength(3)]],
      telephone: ['8765456', Validators.required],
      qualification: ['765456']
    });
    this.academyDetailsForm = this._formBuilder.group({
      academyName: ['34567876543456', Validators.required],
      academyDescription: ['34567876543456', Validators.required]
    });
  }

  signUp() {
    const user: any = {
      userBasicInfo: this.basicUserForm.value,
      userSpecificInfo: this.specificUserForm.value,
      academyDetails: this.academyDetailsForm.value
    };
    if (this._auth.user['value']) {
      this._auth.customSignUp(user, this._auth.user['value']['uid']);
    } else {
      this._auth
        .signupWithEmailPassword(this.email.value, this.password.value)
        .then(res => {
          console.log(res.user.uid);
          this._auth.customSignUp(user, res.user.uid);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  async googleLogin() {
    await this._auth.googleLogin();
    if (this._auth.user) {
      this._auth.user.subscribe(user => {
        if (user) {
          const splitName = user.displayName.split(' ');
          this.firstName.setValue(splitName[0]);
          this.lastName.setValue(splitName[1]);
          this.photoURL.setValue(user.photoURL);
          this.email.setValue(user.email);
        }
      });
    }
  }

  async facebookLogin() {
    await this._auth.facebookLogin();
  }

  printValues() {
    // console.log(this.basicUserForm);
    // console.log(this.basicUserForm.value);
    // console.log(JSON.stringify(this.basicUserForm.value, undefined, 2));
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
  get photoURL() {
    return this.basicUserForm.get('photoURL');
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
