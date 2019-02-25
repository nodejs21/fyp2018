import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogClose } from '@angular/material';
import { ConfirmdeletionComponent } from '../../../shared/confirmdeletion/confirmdeletion.component';
import { SearchacademyComponent } from '../../../shared/searchacademy/searchacademy.component';
import { TeacherService } from '../../../../utils/services/firestore/teacher/teacher.service';

@Component({
  selector: 'app-teacherdashboard',
  templateUrl: './teacherdashboard.component.html',
  styleUrls: ['./teacherdashboard.component.css']
})
export class TeacherdashboardComponent implements OnInit {
  constructor(
    private _teacherService: TeacherService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {}

  ngOnInit() {}

  openDialog() {
    // if (!this._teacherService.academies) this.getAcademies();
    const dialogRef = this._dialog.open(SearchacademyComponent, {
      data: { value: true }
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

  // getAcademies() {
  //   this._teacherService.getAcademies();
  // }
}
