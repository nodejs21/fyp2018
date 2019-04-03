import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddassignmentComponent } from './addassignment/addassignment.component';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  constructor(private _dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    // if (!this._teacherService.academies) this.getAcademies();
    const dialogRef = this._dialog.open(AddassignmentComponent, {
      data: []
    });
  }
}
