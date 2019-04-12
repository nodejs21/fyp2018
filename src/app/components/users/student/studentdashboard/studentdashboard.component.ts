import { Component, OnInit } from '@angular/core';
import { SearchacademyComponent } from '../../../shared/searchacademy/searchacademy.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SharedService } from '../../../../utils/services/firestore/shared/shared.service';

@Component({
  selector: 'app-studentdashboard',
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent implements OnInit {
  constructor(
    private _dialog: MatDialog,
    public _shared: SharedService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  openDialog() {
    // if (!this._teacherService.academies) this.getAcademies();
    const dialogRef = this._dialog.open(SearchacademyComponent, {
      data: []
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this._shared
          .applyForSubjects(res)
          .then(() => {
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
}
