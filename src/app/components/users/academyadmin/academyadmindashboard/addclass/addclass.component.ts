import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AuthService } from '../../../../../utils/services/auth/auth.service';
import { AdminService } from '../../../../../utils/services/firestore/admin/admin.service';

@Component({
  selector: 'app-addclass',
  templateUrl: './addclass.component.html',
  styleUrls: ['./addclass.component.css']
})
export class AddclassComponent implements OnInit {
  classes = [9, 10, 11, 12];
  constructor(
    public dialogRef: MatDialogRef<AddclassComponent>,
    private _auth: AuthService,
    private _adminService: AdminService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  updateClass() {
    this._adminService
      .updateClass(this.data.classId, this.data.className)
      .then(res => {
        this.showSnackBar(
          `Class: ${this.data.className} successfully updated!`
        );
      })
      .catch(err => {
        console.error(err);
      });
  }

  addClass() {
    // var key = 'className';
    // let value = this.data[key];
    // if (value && value.trim() != '') {
    //   this.data[key] = value.trim();
    // } else {
    //   this.data[key] = undefined;
    // }

    // console.log(this.data);
    this._adminService
      .addClass(this.data.className)
      .then(res => {
        this.showSnackBar(`Class: ${this.data.className} successfully added!`);
      })
      .catch(err => {
        console.error(err);
      });

    // console.log(this._auth.user.subscribe(user));
    // for (let key in this.data) {
    //   let value = this.data[key];
    //   if (value && value.trim() != '') {
    //     this.data[key] = value.trim();
    //   } else {
    //     this.data[key] = undefined;
    //   }
    // }
  }

  showSnackBar(message) {
    this.dialogRef.close();
    this._snackBar.open(message, 'X', { duration: 4000 });
  }

  ngOnInit() {}
}
