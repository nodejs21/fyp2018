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
  constructor(
    public dialogRef: MatDialogRef<AddclassComponent>,
    private _auth: AuthService,
    private _admin: AdminService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  addClass() {
    var key = 'className';
    let value = this.data[key];
    if (value && value.trim() != '') {
      this.data[key] = value.trim();
    } else {
      this.data[key] = undefined;
    }

    console.log(this.data);

    this._admin
      .addClass(this.data.className)
      .then(res => {
        console.log(res);
        this._snackBar.open(
          // 'Class: ' + this.data.className + ' has been successfully added!',
          `Class: ${this.data.className} successfully added!`,
          'X',
          { duration: 4000 }
        );
        this.dialogRef.close();
      })
      .catch(err => {
        console.log();
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

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}
}
