import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AdminService } from "../../../../../utils/services/firestore/admin/admin.service";

@Component({
  selector: "createclassroom",
  templateUrl: "./createclassroom.component.html",
  styleUrls: ["./createclassroom.component.css"]
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
  constructor(
    public _admin: AdminService,
    public dialogRef: MatDialogRef<CreateclassroomComponent>,
    @Inject(MAT_DIALOG_DATA) public data = []
  ) {}

  ngOnInit() {
    console.log(this.classroom);

    this._admin.getClasses().subscribe(res => {
      this.classes = res;
      console.log(res);
    });
    this._admin.getSubjects().subscribe(res => {
      this.subjects = res;
      console.log(res);
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
