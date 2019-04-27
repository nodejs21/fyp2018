import { Component, OnInit } from "@angular/core";
import { MatDialog, MatTableDataSource, MatSnackBar } from "@angular/material";
import { AddassignmentComponent } from "./addassignment/addassignment.component";
import { SharedService } from "../../../../../utils/services/firestore/shared/shared.service";
import { AuthService } from "../../../../../utils/services/auth/auth.service";
import { Router } from "@angular/router";
import { TeacherService } from '../../../../../utils/services/firestore/teacher/teacher.service';

export interface Assignment {
  assignmentTitle: string;
  assignmentNumber: number;
  addedDate: string;
  dueDate: string;
  totalMarks: number;
  fileURL: string;
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
  selector: "app-assignments",
  templateUrl: "./assignments.component.html",
  styleUrls: ["./assignments.component.css"]
})
export class AssignmentsComponent implements OnInit {
  displayedColumns: string[] = [
    "assignmentNumber",
    "assignmentTitle",
    "addedDate",
    "dueDate",
    "totalMarks",
    "fileURL"
  ];
  // tslint:disable-next-line: no-use-before-declare
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  approvedRequests = [];
  classrooms;
  allAssignments;
  subjects;
  academyId;
  classroomId;
  assignments;
  subject;

  constructor(
    private _dialog: MatDialog,
    private _shared: SharedService,
    private _auth: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _teacher: TeacherService
  ) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this._shared.getUserRequests().subscribe(user => {
        if (!user["requests"]) return;
        user["requests"].forEach(academy => {
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
    this._shared.getTeacherClassrooms(academyId).subscribe(classrooms => {
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
      .getAssignments(this.academyId, classroom.id)
      .subscribe(assignments => {
        this.assignments = assignments;
        console.log(this.assignments);

        // assignments.forEach((assignment, index) => {
        //   ELEMENT_DATA.push({
        //     assignmentTitle: assignment.data.title,
        //     assignmentNumber: index,
        //     addedDate: assignment.data.uploadedOn,
        //     dueDate: assignment.data.dueDate,
        //     totalMarks: assignment.data.totalMarks,
        //     fileURL: assignment.data.uploadedFile
        //   });
        // });
      });
  }

  viewDetails(assignment) {
    console.log(assignment);
    this._router.navigate(["teacher/createassignment"], {
      queryParams: { data: JSON.stringify(assignment.data), id: assignment.id }
    });
  }

  deleteAssignment(assignment) {
    console.log(assignment);
    const data = assignment.data;
    this._teacher.deleteAssignment(data.academy.academyId, data.classRoom.classRoomId, assignment.id).then(res => {
      this.showSnackBar(`Assignment has been deleted!`, "bg-danger");
    })
  }

  openDialog() {
    // if (!this._teacherService.academies) this.getAcademies();
    this._dialog.open(AddassignmentComponent, {
      data: []
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showSnackBar(message, style) {
    this._snackBar.open(message, "X", {
      duration: 4000,
      panelClass: style
    });
  }

}
