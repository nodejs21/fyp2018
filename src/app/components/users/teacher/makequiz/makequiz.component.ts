import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
@Component({
  selector: 'app-makequiz',
  templateUrl: './makequiz.component.html',
  styleUrls: ['./makequiz.component.css']
})
export class MakequizComponent implements OnInit {
  quizForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.quizForm = this.formBuilder.group({
      subject: 'Islamiyat',
      title: 'Chapter 1',
      duration: 10,
      totalMarks: 10,
      status: 'Saved',
      questions: this.formBuilder.array([this.initQuestion()])
    });
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
    alert(JSON.stringify(this.quizForm.value));
    console.log(this.quizForm.value);
  }

}
