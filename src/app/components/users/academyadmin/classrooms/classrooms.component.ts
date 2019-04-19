import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateclassroomComponent } from './createclassroom/createclassroom.component';
import { AuthService } from '../../../../utils/services/auth/auth.service';
import { AdminService } from '../../../../utils/services/firestore/admin/admin.service';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit {
  classrooms: any;

  constructor(
    private _dialog: MatDialog,
    private _auth: AuthService,
    private _admin: AdminService
  ) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this._admin.getClassrooms().subscribe(classrooms => {
        console.log(classrooms);

        this.classrooms = classrooms;
      });
    });
  }
  openDialog() {
    // if (!this._teacherService.academies) this.getAcademies();
    const dialogRef = this._dialog.open(CreateclassroomComponent, {
      data: []
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

  deleteClassroom(id: string) {
    this._admin.deleteClassroom(id);
  }
}
