import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  displayedColumns: string[] = ['quizNumber', 'quizTitle', 'addedDate', 'dueDate', 'quizTime', 'totalMarks', 'status', 'controls'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _dialog: MatDialog) { }

  ngOnInit() {
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}

export interface PeriodicElement {
  quizTitle: string;
  quizNumber: number;
  addedDate: string;
  quizTime: number;
  dueDate: string;
  totalMarks: number;
  status: string;
  controls: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  // tslint:disable-next-line: max-line-length
    { quizNumber: 1, quizTitle: 'Business Plan', addedDate: '10-03-2019' , quizTime: 15, dueDate: '20-03-2019', totalMarks: 10 , status: 'Pending/Submitted' , controls: 'Edit/Delete'},
  // tslint:disable-next-line: max-line-length
    ];

