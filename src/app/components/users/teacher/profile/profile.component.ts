import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../utils/services/auth/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material';
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

  isUploading = false;

  user;

  downloadURL =
    'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';

  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private storage: AngularFireStorage,
    private _snackBar: MatSnackBar
  ) {
    this.max = 10;
    this.rate = 7;
    this.isReadonly = false;
    this.isCollapsed = false;
    this.iconCollapse = 'icon-arrow-up';
  }

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this.user = user;
      this.basicUserForm = this._formBuilder.group({
        firstName: [user.firstName, Validators.required],
        lastName: [user.lastName, Validators.required],
        email: [user.email, [Validators.required, Validators.email]],
        photoURL: [user.photoURL],
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
    });
  }

  // Rating Code Start
  // Rating Code Start
  // Rating Code Start

  updateProfile(id: string) {
    const user: any = {
      userBasicInfo: this.basicUserForm.value,
      userSpecificInfo: this.specificUserForm.value
    };

    this._auth
      .updateUser(user, id)
      .then(res => {
        console.log(res);
        this.showSnackBar(`Profile has been updated successfully!`);
      })
      .catch(error => console.error(error));
    // this._auth.(user, this._auth.user['value']['uid']);
  }
  showSnackBar(message) {
    this._snackBar.open(message, 'X', {
      duration: 4000,
      panelClass: 'bg-success'
    });
  }
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

  handler(e) {
    this.isUploading = true;
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
            this.photoURL.setValue(dl);
            console.log(this.downloadURL);
            this.isUploading = false;
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
}
