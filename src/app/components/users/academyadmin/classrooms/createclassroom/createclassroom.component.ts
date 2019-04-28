import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AdminService } from '../../../../../utils/services/firestore/admin/admin.service';
import { AuthService } from '../../../../../utils/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'createclassroom',
  templateUrl: './createclassroom.component.html',
  styleUrls: ['./createclassroom.component.css']
})
export class CreateclassroomComponent implements OnInit {
  classes: any;
  subjects: any;

  classroomForm: FormGroup;

  classId: String;
  subjectId: String;
  teacherId: String;
  studentsIds: [String];
  selectedClass: String;
  selectedClassSubjects = [];
  selectedSubjectTeachers = [];
  selectedSubjectStudents = [];
  classMap: object = {};
  teachers: any;
  cstudents: any;
  cdays = [];
  ctime: number;
  cduration: number;
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
    private _fb: FormBuilder,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data = []
  ) {}
  ngOnInit() {
    this.classroomForm = this._fb.group({
      class: ['', Validators.required],
      subject: ['', Validators.required],
      teacher: ['', Validators.required],
      students: [[], Validators.required],
      days: [['monday', 'thursday'], Validators.required],
      time: [4, Validators.required],
      duration: [60, Validators.required],
      createdOn: ['']
    });
    this._auth.user.subscribe(user => {
      console.log(this.data);

      this._admin.getClasses().subscribe(res => {
        this.classes = res;
        console.log(this.classMap);
        this.classes.forEach(c => {
          this.classMap = {
            ...this.classMap,
            [c.data.className]: c.data.subjects
          };
        });
        console.log(this.classMap, 'CLASSMAP');
        console.log(this.classes, 'CLASSES');
      });
      this._admin.getSubjects().subscribe(res => {
        console.log(res, 'SUBJECTS');
        this.subjects = res;
      });
      this._admin.getTeachers().subscribe(res => {
        this.teachers = res;
      });
      this._admin.getStudents().subscribe(res => {
        this.cstudents = res;
      });
    });
  }

  showSubjects(classId, className) {
    this.selectedClassSubjects = [];
    this.selectedClass = className;
    if (this.subjects) {
      this.subjects.forEach(subject => {
        console.log(subject);
        if (subject.data.classRef == classId) {
          this.selectedClassSubjects.push(subject);
        }
      });
    }
  }

  showTeachers(subjectId) {
    this.selectedSubjectTeachers = [];
    if (this.teachers) {
      this.teachers.forEach(teacher => {
        if (
          teacher.data.classId == this.class.value.classId &&
          teacher.data.subjectId == subjectId
        ) {
          this.selectedSubjectTeachers.push(teacher);
        }
      });
    }
  }

  showStudents(subjectId) {
    this.selectedSubjectStudents = [];
    if (this.students) {
      this.cstudents.forEach(student => {
        if (
          student.data.classId == this.class.value.classId &&
          student.data.subjectId == subjectId
        ) {
          this.selectedSubjectStudents.push(student);
        }
      });
    }
  }

  createClass() {
    if (!this.classroomForm.valid) return;
    this.createdOn.setValue(new Date());
    console.log(this.classroomForm.value);
    this._admin
      .createClassroom(this.classroomForm.value)
      .then(res => {
        console.log(res);
        this._snackbar.open('Classroom created!', 'X', {
          duration: 4000,
          panelClass: 'bg-success'
        });
        this.dialogRef.close();
      })
      .catch(error => {
        console.error(error);
        this._snackbar.open('Some error in creating classroom!', 'X', {
          duration: 4000,
          panelClass: 'bg-danger'
        });
      });
  }

  get class() {
    return this.classroomForm.get('class');
  }
  get subject() {
    return this.classroomForm.get('subject');
  }
  get teacher() {
    return this.classroomForm.get('teacher');
  }
  get students() {
    return this.classroomForm.get('students');
  }
  get days() {
    return this.classroomForm.get('days');
  }
  get time() {
    return this.classroomForm.get('time');
  }
  get duration() {
    return this.classroomForm.get('duration');
  }
  get createdOn() {
    return this.classroomForm.get('createdOn');
  }
}
