import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Quiz } from '../../../models/Quiz';
import { Question } from '../../../models/Questions';

@Component({
  selector: 'app-createquiz',
  templateUrl: './createquiz.component.html',
  styles: []
})
export class CreatequizComponent implements OnInit {
  quizForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.quizForm = this.formBuilder.group({
      subject: 'Islamiyat'.toLowerCase(),
      title: 'Chapter 1'.toLowerCase(),
      duration: 10,
      totalMarks: 10,
      status: 'Saved'.toLowerCase(),
      questions: this.formBuilder.array([this.initQuestion()])
    });
    console.log(this.quizForm.value);
  }

  initQuestion() {
    return this.formBuilder.group({
      text: 'What is the fitna of this period?',
      type: 'mcq'.toLowerCase(),
      mcqOptions: this.formBuilder.array([
        this.initMcqOption(),
        this.initMcqOption()
      ]),
      mcqCorrectOption: 'internet'.toLowerCase(),
      tfCorrectOption: 'false'.toLowerCase()
    });
  }

  initMcqOption() {
    return this.formBuilder.group({
      option: 'Internet'.toLowerCase()
    });
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
}
