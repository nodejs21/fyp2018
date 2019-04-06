import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AddassignmentComponent } from './addassignment/addassignment.component';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'totalmarks', 'controls'];
// tslint:disable-next-line: no-use-before-declare
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(private _dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    // if (!this._teacherService.academies) this.getAcademies();
    const dialogRef = this._dialog.open(AddassignmentComponent, {
      data: []
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  totalmarks: number;
  controls: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', totalmarks: 10 , controls: 'Edit/Delete'},
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', totalmarks: 10 , controls: 'Edit/Delete'},
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'xz', totalmarks: 10 , controls: 'Edit/Delete'},
];
