import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddclassComponent } from './addclass/addclass.component';
import { Router } from '@angular/router';
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
  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private _auth: AuthService,
    private _adminService: AdminService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this.user = user;
      this.getClasses();
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
      // this.classes = await res.map(data => {
      //   return { id: data.payload.doc.id, data: data.payload.doc.data() };
      // });
      console.log(this.classes);
    });
  }

  deleteClass(classId, className) {
    const confirmDeleteionDialog = this._dialog.open(ConfirmdeletionComponent, {
      data: {
        title: 'Confirm class deletion',
        body: `Are you sure you want to delete class: <strong>${className}</strong>`
      }
    });
    confirmDeleteionDialog.afterClosed().subscribe(result => {
      if (result) {
        this._adminService
          .deleteClass(classId)
          .then(res => {
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
