import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'addassignment',
  templateUrl: './addassignment.component.html',
  styleUrls: ['./addassignment.component.css']
})
export class AddassignmentComponent implements OnInit {

  assignmentTitle = new FormControl();
  assignmentMarks = new FormControl();
  classes = [9, 10, 11, 12];
  selectedClass;
  subjects = ["Maths","Chemistry","Physics","Biology"]
  selectedSubjects;
  constructor(
    public dialogRef: MatDialogRef<AddassignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data = []
  ) {}

  ngOnInit() {}
}
