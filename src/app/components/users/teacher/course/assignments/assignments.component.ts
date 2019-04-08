import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AddassignmentComponent } from './addassignment/addassignment.component';


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  displayedColumns: string[] = ['assignmentNumber', 'assignmentTitle', 'addedDate', 'dueDate', 'totalMarks', 'controls'];
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
  assignmentTitle: string;
  assignmentNumber: number;
  addedDate: string;
  dueDate: string;
  totalMarks: number;
  controls: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
// tslint:disable-next-line: max-line-length
  { assignmentNumber: 1, assignmentTitle: 'Business Plan', addedDate: '10-03-2019' , dueDate: '20-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
// tslint:disable-next-line: max-line-length
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
  { assignmentNumber: 2, assignmentTitle: 'Project Plan', addedDate: '20-03-2019' , dueDate: '30-03-2019', totalMarks: 10 , controls: 'Edit/Delete'},
];
