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
  quiz: Quiz;
  question: Question[];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.quizForm = this.formBuilder.group({
      subject: 'Islamiyat',
      title: 'Chapter 1',
      duration: 10,
      totalMarks: 10,
      status: 'Saved',
      questions: this.formBuilder.array([
        this.formBuilder.group({
          text: 'What is the fitna of this period?',
          type: 'mcq',
          mcqOptions: this.formBuilder.array([
            this.formBuilder.group({
              option: 'Internet'
            })
          ]),
          mcqCorrectOption: 3,
          tfCorrectOption: true
        })
      ])
    });
    console.log(this.quizForm.value);

    // this.quizForm = this.formBuilder.group({
    //   subject: 'Islamiyat',
    //   title: 'Chapter 1',
    //   duration: 10,
    //   totalMarks: 10,
    //   status: 'Saved',
    //   questions: [
    //     {
    //       text: 'What is the fitna of this period?',
    //       type: 'MCQ',
    //       mcqOptions: [
    //         {
    //           no: 1,
    //           opttion: 'Internet'
    //         },
    //         {
    //           no: 2,
    //           opttion: 'Social media'
    //         },
    //         {
    //           no: 3,
    //           opttion: 'Both'
    //         }
    //       ],
    //       mcqCorrectOption: 3
    //     }
    //   ]
    // });
  }

  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }

  get mcqOptions() {
    return this.quizForm.get('mcqOptions') as FormArray;
  }

  addQuestion() {
    const question = this.formBuilder.group({
      text: 'Type your question here',
      type: 'MCQ',
      mcqOptions: this.formBuilder.array([
        {
          no: 1,
          opttion: 'Option 1'
        },
        {
          no: 2,
          opttion: 'Option 2'
        }
      ]),
      mcqCorrectOption: 0
    });
    this.questions.push(question);
  }

  addOption() {
    const option = this.formBuilder.group({
      no: 1,
      opttion: 'Internet'
    });
    this.mcqOptions.push(option);
  }
}
