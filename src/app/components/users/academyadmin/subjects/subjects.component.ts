import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../utils/services/auth/auth.service';
import { AdminService } from '../../../../utils/services/firestore/admin/admin.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddsubjectComponent } from './addsubject/addsubject.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  user: any;
  subjects: any;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private _adminService: AdminService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {
    console.log(this._route.snapshot.paramMap);
  }

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this.user = user;
      this.getSubjects();
    });
  }

  getSubjects() {
    this._adminService.getSubjects().subscribe(async res => {
      this.subjects = await res.map(data => {
        return { id: data.payload.doc.id, data: data.payload.doc.data() };
      });
      console.log(this.subjects);
    });
  }

  openDialog(subjectId?, subjectName?): void {
    const dialogRef = this._dialog.open(AddsubjectComponent, {
      // width: '450px',
      data: {
        subjectName,
        subjectId,
        user: this.user,
        btnText: subjectName ? 'Update' : 'Add'
      }
      // hasBackdrop: false
    });
  }

  updateSubject() {
    // this._admin
    //   .updateClass(this.data.classId, this.data.className)
    //   .then(res => {
    //     this.showSnackBar(
    //       `Class: ${this.data.className} successfully updated!`
    //     );
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  }

  showSnackBar(message) {
    this._snackBar.open(message, 'X', { duration: 4000 });
  }
}
