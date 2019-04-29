import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SharedService } from '../../../../../utils/services/firestore/shared/shared.service';
import { AuthService } from '../../../../../utils/services/auth/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AssignmentpopupComponent } from '../../../../shared/assignmentpopup/assignmentpopup.component';
import { StudentService } from '../../../../../utils/services/firestore/student/student.service';

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
  assignments;
  assignmentId;
  submittedAssignments;
  submittedAssignmentIds;
  submittedAssignmentMarks: any[];
  submittedAssignmentDates: any[];
  assignmentTitle: any;
  subject: any;
  assignmentsType = 'Posted';

  constructor(
    private _dialog: MatDialog,
    private _shared: SharedService,
    private _auth: AuthService,
    private _student: StudentService,
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

  getAssignments(classroom, academyId?) {
    console.log(classroom.id, this.academyId);
    this.subject = classroom.data.subject.subjectName;
    this._shared
      .getPostedAssignments(this.academyId, classroom.id)
      .subscribe(assignments => {
        console.log(assignments);
        this.assignments = assignments;
        this.getSubmittedAssignments();
      });
  }

  getSubmittedAssignments() {
    this.submittedAssignmentIds = [];
    this.submittedAssignmentMarks = [];
    this.submittedAssignmentDates = [];
    this._student
      .getSubmittedAssignments(
        this.academyId,
        this.classroomId,
        this.user.uid
      )
      .subscribe(assignments => {
        this.submittedAssignments = assignments;
        console.log(this.submittedAssignments);
        this.submittedAssignments.map(assignment => {
          this.submittedAssignmentIds.push(assignment.assignmentId);
          this.submittedAssignmentMarks.push(
            assignment.marks ? assignment.marks : '--'
          );
          this.submittedAssignmentDates.push(
            assignment.submittedOn ? assignment.submittedOn : '--'
          );
          console.log(assignment);
        });
      });
  }

  handler(e, assignment) {
    this.isUploading = true;
    this.assignmentId = assignment.id;
    this.assignmentTitle = assignment.data.title;
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

  viewDetails(assignment) {
    console.log(assignment);
    this._dialog.open(AssignmentpopupComponent, {
      data: assignment,
      width: '50%'
    });
  }

  postAssignment() {
    const assignment = {
      studentId: this.user.uid,
      studentName: this.user.firstName + ' ' + this.user.lastName,
      studentImageUrl: this.user.photoURL,
      filePath: this.assignmentUrl,
      assignmentId: this.assignmentId,
      submittedOn: new Date(),
      status: 'submitted',
      title: this.assignmentTitle
    };
    console.log(assignment);

    this._student
      .submitAssignment(this.academyId, this.classroomId, assignment)
      .then(res => {
        console.log(res);
        //! TALHA MAT DIALOG
      })
      .catch(error => console.error(error));
  }
}
