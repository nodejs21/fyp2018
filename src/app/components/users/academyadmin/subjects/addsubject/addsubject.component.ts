import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { AdminService } from '../../../../../utils/services/firestore/admin/admin.service';

@Component({
  selector: 'addsubject',
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddsubjectComponent>,
    private _adminService: AdminService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
  }

  ngOnInit() {}

  updateSubject() {
    this._adminService
      .updateSubject(this.data.subjectId, this.data.subjectName)
      .then(res => {
        this.showSnackBar(
          `Subject: ${this.data.subjectName} successfully updated!`
        );
      })
      .catch(err => {
        console.error(err);
      });
  }

  addSubject() {
    var key = 'subjectName';
    let value = this.data[key];
    if (value && value.trim() != '') {
      this.data[key] = value.trim();
    } else {
      this.data[key] = undefined;
    }
    this._adminService
      .addSubject(this.data.subjectName)
      .then(res => {
        this.showSnackBar(
          `Subject: ${this.data.subjectName} successfully added!`
        );
      })
      .catch(err => {
        console.error(err);
      });
  }

  showSnackBar(message) {
    this.dialogRef.close();
    this._snackBar.open(message, 'X', { duration: 4000 });
  }
}
