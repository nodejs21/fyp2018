export interface Question {
  text: string;
  type: 'MCQ' | 'T/F';
  mcqOptions: [
    {
      option: string;
    }
  ];
  mcqCorrectOption: string;
  tfOptions: 'True' | 'False';
  tfCorrectOption: 'True' | 'False';
}
