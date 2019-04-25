import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddclassComponent } from './addclass/addclass.component';
import { AdminService } from '../../../../utils/services/firestore/admin/admin.service';
import { AuthService } from '../../../../utils/services/auth/auth.service';
import { ConfirmdeletionComponent } from '../../../shared/confirmdeletion/confirmdeletion.component';

@Component({
  selector: 'app-academyadmindashboard',
  templateUrl: './academyadmindashboard.component.html',
  styleUrls: ['./academyadmindashboard.component.css']
})
export class AcademyadmindashboardComponent implements OnInit {
  user: any;
  classes: any;
  students = [];
  teachers = [];
  classrooms = [];
  constructor(
    private _dialog: MatDialog,
    private _auth: AuthService,
    private _adminService: AdminService,
    private _snackBar: MatSnackBar,
    private _admin: AdminService
  ) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.getClasses();
      }
    });
  }

  openDialog(classId?, className?): void {
    this._dialog.open(AddclassComponent, {
      // width: '450px',
      data: {
        className,
        classId,
        user: this.user,
        btnText: className ? 'Update' : 'Add'
      }
      // hasBackdrop: false
    });
  }

  getClasses() {
    this._adminService.getClasses().subscribe(async res => {
      this.classes = res;
      console.log(this.classes);
      this.classes.forEach(classs => {
        this._admin.getStudentsAgainstClass(classs.id).subscribe(students => {
          this.students.push(students.docs.length);
        });
        this._admin.getTeachersAgainstClass(classs.id).subscribe(teachers => {
          this.teachers.push(teachers.docs.length);
        });
        this._admin
          .getClassroomsAgainstClass(classs.id)
          .subscribe(classrooms => {
            this.classrooms.push(classrooms.docs.length);
          });
      });
    });
  }

  deleteClass(classId, className) {
    const confirmDeleteionDialog = this._dialog.open(ConfirmdeletionComponent, {
      data: {
        title: 'Confirm class deletion',
        body: `Are you sure you want to delete class: <strong>${className}</strong><div class="invalid-feedback d-block">* All the subjects in this class will also be deleted!<div>`
      }
    });
    confirmDeleteionDialog.afterClosed().subscribe(result => {
      if (result) {
        this._adminService
          .deleteClass(classId)
          .then(() => {
            this.showSnackBar(
              `Class: ${className} has been successfully deleted!`
            );
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
  showSnackBar(message) {
    this._snackBar.open(message, 'X', { duration: 4000 });
  }
}
