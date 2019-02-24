import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../utils/services/auth/auth.service';
import { AdminService } from '../../../../utils/services/firestore/admin/admin.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddsubjectComponent } from './addsubject/addsubject.component';
import { ConfirmdeletionComponent } from '../../../shared/confirmdeletion/confirmdeletion.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  user: any;
  classes: any;
  subjects: any;
  selectedClass: any;
  selectedClassId: any;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private _adminService: AdminService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this.user = user;
      this.getClasses();
      this.getSubjects();
    });
  }

  updateSubjects(classId) {
    console.log(classId, this.selectedClass);
    this.selectedClassId = classId;
  }

  async getClasses() {
    await this._adminService.getClasses().subscribe(classes => {
      this.classes = classes;
      // this.selectedClass = classes[0].data.className;
      console.log(classes);
    });
  }

  getSubjects() {
    this._adminService.getSubjects().subscribe(async res => {
      this.subjects = res;
      // this.subjects = await res.map(data => {
      //   return { id: data.payload.doc.id, data: data.payload.doc.data() };
      // });
      console.log(this.subjects);
    });
  }

  openDialog(subjectId?, subjectName?): void {
    const dialogRef = this._dialog.open(AddsubjectComponent, {
      data: {
        className: this.selectedClass,
        classId: this.selectedClassId,
        subjectName,
        subjectId,
        user: this.user,
        btnText: subjectName ? 'Update' : 'Add'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res && res.success) {
        this.updateClassesCollection(res.subjectId, true);
      }
    });
  }

  deleteSubject(subjectId, subjectName) {
    const confirmDeleteionDialog = this._dialog.open(ConfirmdeletionComponent, {
      data: {
        title: 'Confirm subject deletion',
        body: `Are you sure you want to delete subject: <strong>${subjectName}</strong>`
      }
    });
    confirmDeleteionDialog.afterClosed().subscribe(result => {
      if (result) {
        this._adminService
          .deleteSubject(subjectId)
          .then(async res => {
            await this.updateClassesCollection(subjectId, false);
            this.showSnackBar(
              `Subject: ${subjectName} has been successfully deleted!`
            );
          })
          .catch(err => {
            console.error(err);
          });
      }
    });
  }

  //todo adminService CF func call
  updateClassesCollection(subjectId, push) {
    // this._adminService
    //   .cfUpdateClassesCollection(this.selectedClassId, subjectId, push)
    //   .then(res => {
    //     console.log('Classes collection successfully updated!');
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  }
  //todo adminService CF func call

  showSnackBar(message) {
    this._snackBar.open(message, 'X', { duration: 4000 });
  }
}
