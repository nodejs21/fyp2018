import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from '../../../../utils/services/auth/auth.service';
import { AdminService } from '../../../../utils/services/firestore/admin/admin.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  classes;
  selectedClass;
  selectedClassRoom;
  students;
  isplayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  subjects;
  classWithSubjects;
  // data: any = {};

  constructor(private _auth: AuthService, private _admin: AdminService) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this._admin.getStudents().subscribe(students => {
        console.log(students);
        this.subjects = Array.from(
          new Set(students.map(student => student.data.subjectName))
        );
        this.classes = Array.from(
          new Set(students.map(student => student.data.className))
        );
        this.students = this.groupByStudentClass(students, 'className');
        this.classWithSubjects = new Set(
          students.map(student => {
            return {
              subjectName: student.data.subjectName,
              className: student.data.className
            };
          })
        );
      });
    });
  }

  groupByStudentClass(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x['data'][key]] = rv[x['data'][key]] || []).push(x);
      return rv;
    }, []);
  }

  // groupStudentsBySubjects(xs, key) {
  //   return xs.reduce(function(rv, x) {
  //     (rv[x['data'][key]] = rv[x['data'][key]] || []).push(x);
  //     return rv;
  //   }, []);
  // }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewProfile(studentId) {
    console.log(studentId);
  }
}
