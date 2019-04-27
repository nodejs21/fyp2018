import { MatDialog, MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../../utils/services/firestore/shared/shared.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  displayedColumns: string[] = ['quizNumber', 'quizTitle', 'quizAddedDate', 'quizDueDate', 'quizDuration', 'quizTotalMarks', 'quizControls'];
  // tslint:disable-next-line: no-use-before-declare
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    academy;
    classrooms: any;

  constructor(
    private _shared: SharedService,
  ) { }

  ngOnInit() {
  }

  getAcademyData(academy, academyObj) {
    console.log(academy);
    this.academy = academyObj;
    this._shared.getTeacherClassrooms(academy).subscribe(classrooms => {
      this.classrooms = classrooms;
      console.log(this.classrooms);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

  export interface PeriodicElement {
    quizTitle: string;
    quizNumber: number;
    quizAddedDate: string;
    quizDueDate: string;
    quizDuration: number;
    quizTotalMarks: number;
    quizControls: string;
  }

  const ELEMENT_DATA: PeriodicElement[] = [
    // tslint:disable-next-line: max-line-length
      { quizNumber: 1, quizTitle: 'Business Plan', quizAddedDate: '10-03-2019' , quizDueDate: '20-03-2019', quizDuration: 10, quizTotalMarks: 10 , quizControls: 'Edit/Delete'},
    // tslint:disable-next-line: max-line-length
     ];
    

