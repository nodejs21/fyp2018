export interface Question {
    text: string;
    type: 'MCQ' | 'T/F';
    mcqOptions: [{
        no: number;
        option: string;
    }];
    tfOptions: true | false;
    mcqCorrectOption: number;
    tfCorrectOption: true | false;
}
