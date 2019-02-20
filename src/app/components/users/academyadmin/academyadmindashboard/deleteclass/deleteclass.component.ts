import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'deleteclass',
  templateUrl: './deleteclass.component.html',
  styleUrls: ['./deleteclass.component.css']
})
export class DeleteclassComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DeleteclassComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
}
