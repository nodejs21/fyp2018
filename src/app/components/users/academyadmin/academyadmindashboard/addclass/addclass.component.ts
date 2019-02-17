import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-addclass',
  templateUrl: './addclass.component.html',
  styleUrls: ['./addclass.component.css']
})
export class AddclassComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddclassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { className: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}
}
