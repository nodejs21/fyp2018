import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { SharedService } from '../../../../utils/services/firestore/shared/shared.service';
import { AuthService } from '../../../../utils/services/auth/auth.service';
import { StudentService } from '../../../../utils/services/firestore/student/student.service';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-attemptquiz',
  templateUrl: './attemptquiz.component.html',
  styleUrls: ['./attemptquiz.component.css']
})
export class AttemptquizComponent implements OnInit {
  // classes;
  // subjects = [];
  quizForm: FormGroup;
  // classrooms: any;
  // approvedRequests = [];
  // allAssignments;
  // academyId;
  // classroomId;
  quiz;
  marks: number = 0;
  answers = [];
  showMarks = false;
  date: any;
  user;

  constructor(
    private formBuilder: FormBuilder,
    private _data: QuizService,
    private _student: StudentService,
    private _snackBar: MatSnackBar,
    private _auth: AuthService
  ) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this.user = user;
      this._data.quiz.subscribe(quiz => {
        console.log(quiz);
        this.quiz = quiz;
        if (this.quiz) {
          this.date = `${new Date().toISOString().split('T')[0]}T00:${
            quiz.duration
          }:00Z`;
          console.log(this.date);
        }
      });
    });
    // console.log(JSON.parse(this._route.snapshot.paramMap.get('quiz')));
    // this._auth.user.subscribe(user => {
    //   this._shared.getUserRequests().subscribe(userInfo => {
    //     console.log(userInfo);
    //     this.classes = [];
    //     if (!userInfo['requests']) return;
    //     userInfo['requests'].forEach(async academy => {
    //       console.log(academy);
    //       if (academy.length == 0) return;
    //       await this._shared
    //         .getApprovedRequests(academy.academyId)
    //         .subscribe(request => {
    //           if (request.length != 0) {
    //             this.classes.push(request);
    //           }
    //         });
    //     });
    //     console.log(this.classes);
    //   });
    // });
    // this._auth.user.subscribe(user => {
    //   this._shared.getUserRequests().subscribe(user => {
    //     if (!user['requests']) return;
    //     user['requests'].forEach(academy => {
    //       this._shared
    //         .getApprovedRequests(academy.academyId)
    //         .subscribe(request => {
    //           if (!request) return;
    //           if (request.length > 0) {
    //             this.approvedRequests.push(request);
    //           }
    //         });
    //     });
    //   });
    // });
    this.quizForm = this.formBuilder.group({
      className: 0,
      subject: 'Subject Name',
      title: 'Chapter 1',
      duration: 10,
      totalMarks: 10,
      status: 'saved',
      questions: this.formBuilder.array([])
    });
  }

  answerMCQ(questionNumber, value) {
    this.answers[questionNumber] = value;
  }

  answerBoolean(questionNumber, value) {
    this.answers[questionNumber] = value;
  }
  // getAcademyData(academyId) {
  //   this.academyId = academyId;
  //   console.log(academyId);
  //   this._shared.getStudentClassrooms(academyId).subscribe(classrooms => {
  //     this.classrooms = classrooms;
  //     console.log(this.classrooms);
  //   });
  // }

  // getQuizzes(classroom) {
  //   console.log(classroom);
  //   console.log(this.academyId);
  //   this._student
  //     .getQuizzes(this.academyId, classroom.id)
  //     .subscribe(quizzes => {
  //       console.log(quizzes);
  //     });
  // }

  // get className() {
  //   return this.quizForm.get('className');
  // }

  // initQuestion() {
  //   return this.formBuilder.group({
  //     text: '',
  //     type: 'mcq',
  //     mcqOptions: this.formBuilder.array([
  //       this.initMcqOption(),
  //       this.initMcqOption()
  //     ]),
  //     mcqCorrectOption: null,
  //     tfCorrectOption: null
  //   });
  // }

  // initMcqOption() {
  //   const group = this.formBuilder.group({
  //     option: ''
  //   });
  //   return group;
  // }

  // getQuestions(form) {
  //   return form.controls.questions.controls;
  // }
  // getMcqOptions(form) {
  //   return form.controls.mcqOptions.controls;
  // }

  // addQuestion() {
  //   const control = <FormArray>this.quizForm.get('questions');
  //   control.push(this.initQuestion());
  // }

  // updateCorrectMcqOption(questionNumber, correctOptionNumber) {
  //   const question = this.quizForm.get([
  //     'questions',
  //     questionNumber
  //   ]) as FormArray;
  //   question.controls['mcqCorrectOption'].value = correctOptionNumber;
  // }

  // addMcqOption(questionNumber) {
  //   const control = this.quizForm.get([
  //     'questions',
  //     questionNumber,
  //     'mcqOptions'
  //   ]) as FormArray;
  //   control.push(this.initMcqOption());
  // }

  // deleteQuestion(questionNumber) {
  //   const control = this.quizForm.get(['questions']) as FormArray;
  //   control.removeAt(questionNumber);
  // }

  // deleteOption(questionNumber, optionNumber) {
  //   const control = this.quizForm.get([
  //     'questions',
  //     questionNumber,
  //     'mcqOptions'
  //   ]) as FormArray;
  //   control.removeAt(optionNumber);
  // }

  saveQuiz() {
    for (let index = 0; index < this.quiz.questions.length; index++) {
      if (this.quiz.questions[index].type === 'mcq') {
        if (
          parseInt(this.quiz.questions[index].mcqCorrectOption) ==
          this.answers[index]
        ) {
          this.marks++;
        }
      } else {
        if (
          this.quiz.questions[index].tfCorrectOption ==
          this.answers[index].toString()
        ) {
          this.marks++;
        }
      }
    }
    this.showMarks = true;
    this.quiz.marks = this.marks;
    this.quiz.studentAnswers = this.answers;
    this.quiz.studentId = this.user.uid;
    this.quiz.studentName = `${this.user.firstName} ${this.user.lastName}`;
    this._student.uploadQuizMarks(this.quiz).then(res => {
      console.log('Quiz posted!');
      this.showSnackBar(`Quiz has been posted!`, 'bg-success');
    });
  }
  showSnackBar(message, styles) {
    this._snackBar.open(message, 'X', { duration: 5000, panelClass: styles });
  }
}
