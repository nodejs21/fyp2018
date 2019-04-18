import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './../../../../utils/validators/confirm-password.validator';
import { AuthService } from '../../../../utils/services/auth/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  rate: number;
  isReadonly: boolean;
  max: number;

  overStar: number | undefined;
  percent: number;

  isCollapsed: boolean;
  iconCollapse: string;

  editState: boolean = true;

  basicUserForm: FormGroup;
  specificUserForm: FormGroup;
  academyDetailsForm: FormGroup;
  downloadURL =
    'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';

  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private storage: AngularFireStorage
  ) {
    this.max = 10;
    this.rate = 7;
    this.isReadonly = false;
    this.isCollapsed = false;
    this.iconCollapse = 'icon-arrow-up';
  }

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this.basicUserForm = this._formBuilder.group({
        firstName: [user.firstName, Validators.required],
        lastName: [user.lastName, Validators.required],
        email: [user.email, [Validators.required, Validators.email]],
        photoURL: [this.downloadURL],
        gender: [true],
        userType: [user.userType.toLowerCase()]
      });
      this._auth
        .getUserSpecificInfo(user.userType, user.uid)
        .subscribe((user: any) => {
          this.specificUserForm = this._formBuilder.group({
            dob: [user.dob, Validators.required],
            address: [
              user.address,
              [Validators.required, Validators.minLength(5)]
            ],
            city: [user.city, [Validators.required, Validators.minLength(3)]],
            telephone: [user.telephone, Validators.required],
            qualification: [user.qualification]
          });
        });

      this._auth.getAcademyDetails(user.uid).subscribe((details: any) => {
        this.academyDetailsForm = this._formBuilder.group({
          academyName: [details.academyName, Validators.required],
          academyDescription: [details.academyDescription, Validators.required]
        });
      });
    });
  }

  // Rating Code Start
  // Rating Code Start
  // Rating Code Start

  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
  }

  resetStar(): void {
    this.overStar = void 0;
  }
  // Rating Code End
  // Rating Code End
  // Rating Code End
  // Rating Code End

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
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

  handler(e) {
    let file = e.target.files[0];
    console.log(file);

    const filePath = `pictures/${Date.now()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    // this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(dl => {
            this.downloadURL = dl;
            console.log(this.downloadURL);
          });
        })
      )
      .subscribe();

    // file.thumbUrl = '';

    // const reader = new FileReader();
    // reader.onload = () => {
    //   file.thumbUrl = reader.result;
    //   console.log(reader.result);
    // };
    // this.uploadFirebaseStorage(file);
  }

  uploadFirebaseStorage(file) {
    const filePath = `displayPicture/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = fileRef.putString(file.thumbUrl.split(',')[1], 'base64');
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            file.url = url;
            file.thumbUrl = url;

            console.log(file);

            // this.onSuccess('200', file);
          });
        })
      )
      .subscribe();
  }
}
