import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminService } from '../../../../../utils/services/firestore/admin/admin.service';
import { AuthService } from '../../../../../utils/services/auth/auth.service';

@Component({
  selector: 'createclassroom',
  templateUrl: './createclassroom.component.html',
  styleUrls: ['./createclassroom.component.css']
})
export class CreateclassroomComponent implements OnInit {
  classes: any;
  subjects: any;
  classroom: any = {
    classId: String,
    subjectId: String,
    teacherId: String,
    studentsIds: [String]
  };
  selectedClassSubjects: any;
  days = [];
  time = [];
  daysOfWeek = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ];
  hoursOfDay = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24
  ];
  constructor(
    public _admin: AdminService,
    public dialogRef: MatDialogRef<CreateclassroomComponent>,
    private _auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data = []
  ) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      console.log(this.classroom);
      this._admin.getClasses().subscribe(res => {
        this.classes = res;
        console.log(res);
      });
      this._admin.getSubjects().subscribe(res => {
        this.subjects = res;
        console.log(res);
      });
    });
  }

  showSubjects(classId) {
    this.selectedClassSubjects = [];
    if (this.subjects) {
      this.subjects.forEach(subject => {
        if (subject.data.classRef == classId) {
          this.selectedClassSubjects.push(subject);
        }
      });
    }
  }
}
