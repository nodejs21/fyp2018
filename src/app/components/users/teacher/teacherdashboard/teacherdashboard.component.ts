import { Component, OnInit } from '@angular/core';
import { SearchacademyComponent } from '../../../shared/searchacademy/searchacademy.component';
import { TeacherService } from '../../../../utils/services/firestore/teacher/teacher.service';
import { MatDialog } from '@angular/material';
import { AuthService } from '../../../../utils/services/auth/auth.service';
import { SharedService } from '../../../../utils/services/firestore/shared/shared.service';

@Component({
  selector: 'app-teacherdashboard',
  templateUrl: './teacherdashboard.component.html',
  styleUrls: ['./teacherdashboard.component.css']
})
export class TeacherdashboardComponent implements OnInit {
  user;
  constructor(
    private _dialog: MatDialog,
    public _shared: SharedService,
    private _auth: AuthService
  ) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this.user = user;
    });
  }

  openDialog() {
    // if (!this._teacherService.academies) this.getAcademies();
    const dialogRef = this._dialog.open(SearchacademyComponent, {
      data: []
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this._shared.applyForSubjects(res);
        // .then(res => {
        //   console.log(res);
        // })
        // .catch(error => {
        //   console.error(error);
        // });
      }
    });
  }

  // getAcademies() {
  //   this._teacherService.getAcademies();
  // }
}
