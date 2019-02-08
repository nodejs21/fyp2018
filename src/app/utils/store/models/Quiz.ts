import { Question } from './Questions';

export interface Quiz {
  subject: string;
  title: string;
  duration: number;
  totalmarks: number;
  status: 'Uploaded' | 'Saved';
  questions: Question[];
}
