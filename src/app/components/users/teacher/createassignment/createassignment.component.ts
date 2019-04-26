import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-createassignment',
  templateUrl: './createassignment.component.html',
  styleUrls: ['./createassignment.component.css']
})
export class CreateassignmentComponent implements OnInit {
  htmlContent = 'Create your assignment';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    // uploadUrl: 'v1/images', // if needed
    customClasses: [
      // optional
      {
        name: 'quote',
        class: 'quote'
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1'
      }
    ]
  };
  constructor() {}

  ngOnInit() {}

  postAssignment() {
    console.log(this.htmlContent);
  }
}
