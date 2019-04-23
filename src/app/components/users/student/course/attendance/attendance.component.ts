import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  displayedColumns: string[] = ['lectureno','lecturetitle', 'attendancestatus', 'lecturedate', 'lecturestarttime', 'lectureendtime'];
// tslint:disable-next-line: no-use-before-declare
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _dialog: MatDialog) { }

  ngOnInit() {
  }
  

applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
export interface PeriodicElement {
  lectureno: number;
  attendancestatus: string;
  lecturetitle: string;
  lecturedate: string;
  lecturestarttime: string;
  lectureendtime: string;
  
}


const ELEMENT_DATA: PeriodicElement[] = [
// tslint:disable-next-line: max-line-length
  { lectureno: 1 , lecturetitle: 'Simplex Method', attendancestatus: 'Present/Absent', lecturedate: '10-03-2019' , lecturestarttime: '10:15 AM', lectureendtime: '11:15 AM' },
// tslint:disable-next-line: max-line-length
  
];
