import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizData = new BehaviorSubject<any>(null);
  quiz = this.quizData.asObservable();

  constructor() {}

  updateQuiz(quiz) {
    return this.quizData.next(quiz);
  }
}
