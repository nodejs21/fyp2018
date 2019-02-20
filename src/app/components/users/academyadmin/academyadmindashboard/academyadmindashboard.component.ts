import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddclassComponent } from './addclass/addclass.component';
import { Router } from '@angular/router';
import { AdminService } from '../../../../utils/services/firestore/admin/admin.service';
import { AuthService } from '../../../../utils/services/auth/auth.service';
import { DeleteclassComponent } from './deleteclass/deleteclass.component';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-academyadmindashboard',
  templateUrl: './academyadmindashboard.component.html',
  styleUrls: ['./academyadmindashboard.component.css']
})
export class AcademyadmindashboardComponent implements OnInit {
  user: any;
  classes: any;
  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private _auth: AuthService,
    private _adminService: AdminService,
    private _snackBar: MatSnackBar
  ) {}

  className: any;

  openDialog(): void {
    const dialogRef = this._dialog.open(AddclassComponent, {
      // width: '450px',
      data: { className: this.className, user: this.user }
      // hasBackdrop: false
    });
  }

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this.user = user;
      this.getClasses();
    });
  }

  getClasses() {
    this._adminService.getClasses().subscribe(async res => {
      this.classes = await res.map(data => {
        return { id: data.payload.doc.id, data: data.payload.doc.data() };
      });
      console.log(this.classes);
    });
  }

  deleteClass(classId, className) {
    const confirmClassDeleteionDialog = this._dialog.open(
      DeleteclassComponent,
      {
        data: {
          title: 'Confirm class deletion',
          body: `Are you sure you want to delete class: <strong>${className}</strong>`
        }
      }
    );
    confirmClassDeleteionDialog.afterClosed().subscribe(result => {
      if (result) {
        this._adminService
          .deleteClass(classId)
          .then(res => {
            this._snackBar.open(
              `Class: ${className} has been successfully deleted!`,
              'X',
              {
                duration: 4000
              }
            );
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
}
