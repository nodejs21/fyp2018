import { Component, OnInit, Inject } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-assignmentpopup',
  templateUrl: './assignmentpopup.component.html',
  styleUrls: ['./assignmentpopup.component.scss']
})
export class AssignmentpopupComponent implements OnInit {
  htmlContent = 'Create your assignment';
  config: AngularEditorConfig = {
    editable: false,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    showToolbar: false
  };

  constructor(
    public dialogRef: MatDialogRef<AssignmentpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.htmlContent = this.data.data.assignment;
    console.log(this.data);
  }
}
