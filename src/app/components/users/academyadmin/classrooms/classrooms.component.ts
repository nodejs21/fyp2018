import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateclassroomComponent } from './createclassroom/createclassroom.component';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit {

  constructor(private _dialog: MatDialog) { }

  ngOnInit() {
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
}
