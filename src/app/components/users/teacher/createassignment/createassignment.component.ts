import { Component, OnInit } from "@angular/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { SharedService } from "../../../../utils/services/firestore/shared/shared.service";
import { AuthService } from "../../../../utils/services/auth/auth.service";
import { TeacherService } from "../../../../utils/services/firestore/teacher/teacher.service";
import { MatSnackBar } from "@angular/material";
import { finalize, isEmpty } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/storage";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-createassignment",
  templateUrl: "./createassignment.component.html",
  styleUrls: ["./createassignment.component.css"]
})
export class CreateassignmentComponent implements OnInit {
  approvedRequests = [];
  assignment;
  academy;
  classroom;
  classrooms: any;
  selectedClassroom;
  title;
  dueDate;
  subject;
  totalMarks;
  isEditMode: boolean = false;
  assignmentId;

  htmlContent = "Create your assignment";
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "25rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    // uploadUrl: 'v1/images', // if needed
    customClasses: [
      // optional
      {
        name: "quote",
        class: "quote"
      },
      {
        name: "redText",
        class: "redText"
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1"
      }
    ]
  };
  disableUploadButton: boolean = false;
  uploadedFile: any = '';
  uploadPercent: any;
  constructor(
    private _shared: SharedService,
    private _auth: AuthService,
    private _teacher: TeacherService,
    private _snackBar: MatSnackBar,
    private storage: AngularFireStorage,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._auth.user.subscribe(async user => {
      this._route.queryParams.subscribe(params => {
        if (!Object.keys(params).length) return;
        this.isEditMode = true;
        const data = JSON.parse(params.data);
        console.log(data);
        
        this.assignmentId = params.id;

        console.log(this.isEditMode);
        console.log(this.assignmentId);

        this.htmlContent = data.assignment;
        this.title = data.title;
        this.dueDate = data.dueDate;
        this.totalMarks = data.totalMarks;
        this.subject = data.subject;
        this.uploadedFile = data.filePath;
        this.academy = data.academy.academyId;
        this.classroom = data.classRoom.classRoomId;
      });

      this._shared.getUserRequests().subscribe(user => {
        if (!user["requests"]) return;
        user["requests"].forEach(academy => {
          console.log(academy);

          this._shared
            .getApprovedRequests(academy.academyId)
            .subscribe(request => {
              console.log(request);

              if (!request) return;
              if (request.length > 0) {
                this.approvedRequests.push(request);
                console.log(request);
              }
            });
        });
      });
    });
  }

  getAcademyData(academy, academyObj) {
    console.log(academy);
    this.academy = academyObj;
    this._shared.getTeacherClassrooms(academy).subscribe(classrooms => {
      this.classrooms = classrooms;
      console.log(this.classrooms);
    });
  }

  selectClassroom(classroom) {
    console.log(this.classroom);
    console.log(classroom);
    this.classroom = classroom;
    this.selectedClassroom = classroom;
    this.subject = classroom.data.subject.subjectName;
  }

  postAssignment() {
    console.log(this.academy);

    const assignment = {
      assignment: this.htmlContent,
      title: this.title,
      dueDate: this.dueDate,
      totalMarks: this.totalMarks,
      subject: this.subject,
      filePath: this.uploadedFile,
      academy: {
        academyName: this.academy.data.academyName,
        academyId: this.academy.data.academyId
      },
      classRoom: {
        classRoomId: this.classroom.id,
        classRoomName: this.classroom.data.class.className
      },
      class: this.classroom.data.class,
      createdOn: new Date()
    };
    if (this.isEditMode) {
      this._teacher
        .updateAssignment(assignment, this.assignmentId)
        .then(res => {
          console.log(res);
          this.showSnackBar(`Assignment has been updated!`, "bg-info");
        })
        .catch(error => console.error(error));
      } else {
        this._teacher
        .createAssignment(assignment)
        .then(res => {
          console.log(res);
          this.showSnackBar(`Assignment has been posted!`, "bg-success");
        })
        .catch(error => console.error(error));
    }
  }

  handler(e) {
    console.log("started uploading file");

    this.disableUploadButton = true;
    const file = e.target.files[0];

    const filePath = `assignments/${Date.now()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    task.percentageChanges().subscribe(res => {
      this.uploadPercent = res;
      console.log(res.toExponential());
      console.log(res.toFixed());
      console.log(res.toLocaleString());
      console.log(res.toPrecision());
      console.log(res.toString());
      console.log(res.valueOf());
    });

    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(dl => {
            console.log("file uploaded");
            this.uploadedFile = dl;
            console.log(this.uploadedFile);
            this.disableUploadButton = false;
          });
        })
      )
      .subscribe();
  }

  showSnackBar(message, style) {
    this._snackBar.open(message, "X", {
      duration: 4000,
      panelClass: style
    });
  }
}
