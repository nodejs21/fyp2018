import { Component, OnInit } from '@angular/core';
import { SearchacademyComponent } from '../../../shared/searchacademy/searchacademy.component';
import { TeacherService } from '../../../../utils/services/firestore/teacher/teacher.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-teacherdashboard',
  templateUrl: './teacherdashboard.component.html',
  styleUrls: ['./teacherdashboard.component.css']
})
export class TeacherdashboardComponent implements OnInit {
  constructor(private _dialog: MatDialog, public _teacher: TeacherService) {}

  ngOnInit() {}

  openDialog() {
    // if (!this._teacherService.academies) this.getAcademies();
    const dialogRef = this._dialog.open(SearchacademyComponent, {
      data: []
    });
    dialogRef.afterClosed().subscribe(res => {
      this._teacher.applyForSubjects(res);
    });
  }

  // getAcademies() {
  //   this._teacherService.getAcademies();
  // }
}
