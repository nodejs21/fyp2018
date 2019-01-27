export interface Question {
  text: string;
  type: 'MCQ' | 'T/F';
  mcqOptions: [
    {
      option: string;
    }
  ];
  mcqCorrectOption: number;
  tfOptions: true | false;
  tfCorrectOption: true | false;
}
