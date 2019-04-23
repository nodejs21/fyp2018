import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { SharedService } from '../../../../utils/services/firestore/shared/shared.service';
import { AuthService } from '../../../../utils/services/auth/auth.service';
@Component({
  selector: 'app-makequiz',
  templateUrl: './makequiz.component.html',
  styleUrls: ['./makequiz.component.css']
})
export class MakequizComponent implements OnInit {
  classes;
  subjects = [];
  quizForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _shared: SharedService,
    private _auth: AuthService
  ) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this._shared.getUserRequests().subscribe(userInfo => {
        console.log(userInfo);
        this.classes = [];
        userInfo['requests'].forEach(async academyid => {
          await this._shared
            .getApprovedRequests(academyid)
            .subscribe(request => {
              if (request.length != 0) {
                this.classes.push(request);
              }
            });
        });
        console.log(this.classes);
      });
    });
    this.quizForm = this.formBuilder.group({
      className: 0,
      subject: 'Islamiyat',
      title: 'Chapter 1',
      duration: 10,
      totalMarks: 10,
      status: 'saved',
      questions: this.formBuilder.array([this.initQuestion()])
    });
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
    question.controls['mcqCorrectOption'].value = correctOptionNumber;
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
    console.log(this.quizForm.value);
  }
}
