import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  displayedColumns: string[] = ['assignmentNumber', 'assignmentTitle', 'addedDate', 'dueDate', 'totalMarks', 'status', 'controls'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(private _dialog: MatDialog) {

   }

  ngOnInit() {
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
  status: string;
  controls: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  // tslint:disable-next-line: max-line-length
    { assignmentNumber: 1, assignmentTitle: 'Business Plan', addedDate: '10-03-2019' , dueDate: '20-03-2019', totalMarks: 10 , status: 'Pending/Submitted' , controls: 'Edit/Delete'},
  // tslint:disable-next-line: max-line-length
    ];
