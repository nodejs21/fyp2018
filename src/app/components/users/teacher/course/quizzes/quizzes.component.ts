import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../../utils/services/firestore/shared/shared.service';
import { AuthService } from '../../../../../utils/services/auth/auth.service';
import { TeacherService } from '../../../../../utils/services/firestore/teacher/teacher.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  academy;
  classrooms: any;
  approvedRequests: any = [];
  subject: any;
  quizzes: any;
  submittedAssignments: any;
  user: any;
  academyId;
  classroomId: any;
  allQuizzes: { id: string }[];
  attemptedQuizzesIds: string[];
  assignmentsType = 'Posted';

  constructor(
    private _shared: SharedService,
    private _teacher: TeacherService,
    private _auth: AuthService
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this._auth.user.subscribe(user => {
      this.user = user;
      this._shared.getUserRequests().subscribe(user => {
        if (!user['requests']) return;
        user['requests'].forEach(academy => {
          console.log(academy);
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

  // getAcademyData(academy, academyObj) {
  //   console.log(academy);
  //   this.academy = academyObj;
  //   this._shared.getTeacherClassrooms(academy).subscribe(classrooms => {
  //     this.classrooms = classrooms;
  //     console.log(this.classrooms);
  //   });
  // }

  getQuizzes(classroom, academyId?) {
    this.academyId = this.academy.data.academyId;
    this.subject = classroom.data.subject.subjectName;
    this.classroomId = classroom.id;
    this._teacher
      .getAllQuizzes(this.academyId, classroom.id)
      .subscribe(allQuizzes => {
        this.allQuizzes = allQuizzes;
        console.log(this.allQuizzes);
      });
    this._teacher
      .getSubmittedQuizzes(this.academyId, classroom.id)
      .subscribe(assignments => {
        this.quizzes = assignments;
        this.attemptedQuizzesIds = assignments.map(assignment => assignment.id);
        console.log(this.attemptedQuizzesIds);
        console.log(this.quizzes);
      });
  }

  deleteQuiz(academyId, classroomId, quizId) {}

  selectClassroom(classroom) {
    console.log(classroom);
    this.subject = classroom.data.subject.subjectName;
  }

  getPostedQuizzes() {
    this.init();
  }
  getSubmittedQuizzes() {
    console.log('Showing submitted quizzes');
    
    // this._teacher
    //   .getSubmittedQuizzes(this.academyId, this.classroomId)
    //   .subscribe(assignments => {
    //     this.submittedAssignments = assignments;
    //     console.log(this.submittedAssignments);
    //   });
  }
}
