import { Component, OnInit } from '@angular/core';
import { SearchacademyComponent } from '../../../shared/searchacademy/searchacademy.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AuthService } from '../../../../utils/services/auth/auth.service';
import { SharedService } from '../../../../utils/services/firestore/shared/shared.service';

@Component({
  selector: 'app-teacherdashboard',
  templateUrl: './teacherdashboard.component.html',
  styleUrls: ['./teacherdashboard.component.css']
})
export class TeacherdashboardComponent implements OnInit {
  approvedRequests;
  classrooms;
  selectedAcademy;
  constructor(
    private _dialog: MatDialog,
    public _shared: SharedService,
    private _snackBar: MatSnackBar,
    private _auth: AuthService
  ) {}

  ngOnInit() {
    this._auth.user.subscribe(async user => {
      await this.getApprovedRequests().then(requests => {
        console.log(requests);
        this.approvedRequests = requests;
      });
    });
  }

  getApprovedRequests() {
    var temp = [];
    return new Promise((resolve, reject) => {
      {
        this._shared.getUserRequests().subscribe(userInfo => {
          if(!userInfo['requests']) return;
          userInfo['requests'].forEach(async request => {
            await this._shared
              .getApprovedRequests(request.academyId)
              .subscribe(request => {
                temp.push(request);
              });
          });
          resolve(temp);
        });
      }
    });
  }

  openDialog() {
    // if (!this._teacherService.academies) this.getAcademies();
    const dialogRef = this._dialog.open(SearchacademyComponent, {
      data: []
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this._shared
          .applyForSubjects(res)
          .then(response => {
            this.showSnackBar(`Your request for subjects has been submitted!`);
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  }

  showSnackBar(message) {
    this._snackBar.open(message, 'X', { duration: 4000 });
  }

  // getAcademies() {
  //   this._teacherService.getAcademies();
  // }
}
