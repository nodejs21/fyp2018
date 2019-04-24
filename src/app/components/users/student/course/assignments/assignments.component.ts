import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SharedService } from '../../../../../utils/services/firestore/shared/shared.service';
import { AuthService } from '../../../../../utils/services/auth/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

export interface Assignment {
  assignmentTitle: string;
  assignmentNumber: number;
  addedDate: string;
  dueDate: string;
  totalMarks: number;
  fileURL: string;
  status: string;
}

const ELEMENT_DATA: Assignment[] = [
  // {
  //   assignmentNumber: 1,
  //   assignmentTitle: 'Business Plan',
  //   addedDate: '10-03-2019',
  //   dueDate: '20-03-2019',
  //   totalMarks: 10
  // }
];

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  displayedColumns: string[] = [
    'assignmentNumber',
    'assignmentTitle',
    'addedDate',
    'dueDate',
    'totalMarks',
    'fileURL',
    'status'
  ];
  // tslint:disable-next-line: no-use-before-declare
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  approvedRequests = [];
  classrooms;
  allAssignments;
  subjects;
  academyId;
  classroomId;
  isUploading: boolean;
  downloadURL: any;
  assignmentUrl: any;
  user;

  constructor(
    private _dialog: MatDialog,
    private _shared: SharedService,
    private _auth: AuthService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this.user = user;
      this._shared.getUserRequests().subscribe(user => {
        if (!user['requests']) return;
        user['requests'].forEach(academy => {
          this._shared
            .getApprovedRequests(academy.academyId)
            .subscribe(request => {
              if (!request) return;
              if (request.length > 0) {
                this.approvedRequests.push(request);
              }
            });
        });
      });
    });
  }

  getAcademyData(academyId) {
    console.log(academyId);
    this._shared.getStudentClassrooms(academyId).subscribe(classrooms => {
      this.classrooms = classrooms;
      console.log(this.classrooms);
    });
  }

  getSubjects(classId) {
    console.log(classId);
    this.subjects = [];
    this.classrooms.forEach(classroom => {
      console.log(classroom);
    });
  }

  getAssignments(classroomId, academyId?) {
    console.log(classroomId, this.academyId);
    this._shared
      .getAssignments(this.academyId, classroomId)
      .subscribe(assignments => {
        console.log(assignments);
        assignments.forEach((assignment, index) => {
          ELEMENT_DATA.push({
            assignmentTitle: assignment.data.title,
            assignmentNumber: index,
            addedDate: assignment.data.uploadedOn,
            dueDate: assignment.data.dueDate,
            totalMarks: assignment.data.totalMarks,
            fileURL: assignment.data.uploadedFile,
            status: assignment.data.status
          });
        });
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handler(e) {
    
    this.isUploading = true;
    let file = e.target.files[0];
    console.log(file);

    const filePath = `assignments/${Date.now()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    // this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(dl => {
            this.downloadURL = dl;
            this.assignmentUrl = dl;
            console.log(this.dataSource.data);
            this.isUploading = false;
            this.postAssignment();
          });
        })
      )
      .subscribe();
  }

  postAssignment() {
    console.log(this.assignmentUrl);
    console.log(this.classroomId);
    console.log(this.user);
    console.log(this.academyId);
  }
}
