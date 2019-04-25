import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { SharedService } from '../../../../utils/services/firestore/shared/shared.service';
import { AuthService } from '../../../../utils/services/auth/auth.service';
import { TeacherService } from '../../../../utils/services/firestore/teacher/teacher.service';
@Component({
  selector: 'app-makequiz',
  templateUrl: './makequiz.component.html',
  styleUrls: ['./makequiz.component.css']
})
export class MakequizComponent implements OnInit {
  classes;
  subjects = [];
  quizForm: FormGroup;
  classrooms: any;
  approvedRequests = [];
  allAssignments;
  academyId;
  classroomId;

  constructor(
    private formBuilder: FormBuilder,
    private _shared: SharedService,
    private _auth: AuthService,
    private _teacher: TeacherService
  ) {}

  ngOnInit() {
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
      status: 'saved',
      academyName: '',
      qacademyId: '',
      qclassroomId: '',
      postedOn: '',
      questions: this.formBuilder.array([this.initQuestion()])
    });
  }

  get academyName() {
    return this.quizForm.get('academyName');
  }
  get qacademyId() {
    return this.quizForm.get('qacademyId');
  }
  get qclassroomId() {
    return this.quizForm.get('qclassroomId');
  }
  get postedOn() {
    return this.quizForm.get('postedOn');
  }

  getAcademyData(academyId) {
    console.log(academyId);
    this._shared.getTeacherClassrooms(academyId).subscribe(classrooms => {
      this.classrooms = classrooms;
      console.log(this.classrooms);
    });
  }

  getQuizzes(classroomId) {
    console.log(classroomId);
  }

  get className() {
    return this.quizForm.get('className');
  }

  initQuestion() {
    return this.formBuilder.group({
      text: '',
      type: 'mcq',
      mcqOptions: this.formBuilder.array([
        this.initMcqOption(),
        this.initMcqOption()
      ]),
      mcqCorrectOption: null,
      tfCorrectOption: null
    });
  }

  initMcqOption() {
    const group = this.formBuilder.group({
      option: ''
    });
    return group;
  }

  getQuestions(form) {
    return form.controls.questions.controls;
  }
  getMcqOptions(form) {
    return form.controls.mcqOptions.controls;
  }

  addQuestion() {
    const control = <FormArray>this.quizForm.get('questions');
    control.push(this.initQuestion());
  }

  updateCorrectMcqOption(questionNumber, correctOptionNumber) {
    const question = this.quizForm.get([
      'questions',
      questionNumber
    ]) as FormArray;
    question.controls['mcqCorrectOption'].setValue(correctOptionNumber);
  }

  addMcqOption(questionNumber) {
    const control = this.quizForm.get([
      'questions',
      questionNumber,
      'mcqOptions'
    ]) as FormArray;
    control.push(this.initMcqOption());
  }

  deleteQuestion(questionNumber) {
    const control = this.quizForm.get(['questions']) as FormArray;
    control.removeAt(questionNumber);
  }

  deleteOption(questionNumber, optionNumber) {
    const control = this.quizForm.get([
      'questions',
      questionNumber,
      'mcqOptions'
    ]) as FormArray;
    control.removeAt(optionNumber);
  }

  saveQuiz() {
    this.academyName.setValue(this.academyId.data.academyName);
    this.qacademyId.setValue(this.academyId.data.academyId);
    this.qclassroomId.setValue(this.classroomId.id);
    this.postedOn.setValue(new Date());
    // console.log(this.academyId);
    // console.log(this.classroomId);
    console.log(this.quizForm.value);

    this._teacher.createQuiz(
      this.quizForm.value,
      this.qacademyId,
      this.qclassroomId
    );
  }
}
