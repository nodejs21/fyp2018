import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedService } from '../../../../../utils/services/firestore/shared/shared.service';
import { AuthService } from '../../../../../utils/services/auth/auth.service';
import { StudentService } from '../../../../../utils/services/firestore/student/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  approvedRequests: any = [];
  quizForm: FormGroup;
  academyId: any;
  classrooms: any;
  quizzes: any;
  classroom;

  constructor(
    private formBuilder: FormBuilder,
    private _shared: SharedService,
    private _auth: AuthService,
    private _student: StudentService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this._shared.getUserRequests().subscribe(user => {
        console.log(user);
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
              }
            });
        });
      });
    });
    this.quizForm = this.formBuilder.group({
      className: 0,
      subject: 'Subject Name',
      title: 'Chapter 1',
      duration: 10,
      totalMarks: 10,
      status: 'saved'
    });
  }

  getAcademyData(academyId) {
    this.academyId = academyId;
    console.log(academyId);
    this._shared.getStudentClassrooms(academyId).subscribe(classrooms => {
      this.classrooms = classrooms;
      console.log(this.classrooms);
    });
  }

  getQuizzes(classroom) {
    console.log(classroom);
    this.classroom = classroom;
    console.log(this.academyId);
    this._student
      .getQuizzes(this.academyId, classroom.id)
      .subscribe(quizzes => {
        console.log(quizzes);
        this.quizzes = quizzes;
      });
  }

  showQuiz(quiz) {
    console.log(quiz);
    this._router.navigate(['student/attemptquiz', { quiz }]);
  }
}
