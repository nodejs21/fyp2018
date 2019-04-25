import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SharedService } from '../../../../utils/services/firestore/shared/shared.service';
import { AuthService } from '../../../../utils/services/auth/auth.service';
import { TeacherService } from '../../../../utils/services/firestore/teacher/teacher.service';

@Component({
  selector: 'app-createassignment',
  templateUrl: './createassignment.component.html',
  styleUrls: ['./createassignment.component.css']
})
export class CreateassignmentComponent implements OnInit {
  approvedRequests = [];
  assignment;
  academy;
  classroom;
  classrooms: any;
  selectedClassroom;

  htmlContent = 'Create your assignment';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    // uploadUrl: 'v1/images', // if needed
    customClasses: [
      // optional
      {
        name: 'quote',
        class: 'quote'
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1'
      }
    ]
  };
  constructor(
    private _shared: SharedService,
    private _auth: AuthService,
    private _teacher: TeacherService
  ) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this._shared.getUserRequests().subscribe(user => {
        if (!user['requests']) return;
        user['requests'].forEach(academy => {
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

  getAcademyData(academy) {
    console.log(academy);
    this._shared.getTeacherClassrooms(academy).subscribe(classrooms => {
      this.classrooms = classrooms;
      console.log(this.classrooms);
    });
  }

  selectClassroom(classroom) {
    this.selectedClassroom = classroom;
  }

  postAssignment() {
    console.log(this.academy);

    const assignment = {
      assignment: this.htmlContent,
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
    this._teacher
      .createAssignment(assignment)
      .then(res => {
        console.log(res);
      })
      .catch(error => console.error(error));
  }
}
