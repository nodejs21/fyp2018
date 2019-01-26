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

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.quizForm = this.fb.group({
      subject: 'Islamiyat',
    });

  }

}
