import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddclassComponent } from './addclass/addclass.component';

@Component({
  selector: 'app-academyadmindashboard',
  templateUrl: './academyadmindashboard.component.html',
  styleUrls: ['./academyadmindashboard.component.css']
})
export class AcademyadmindashboardComponent implements OnInit {
  constructor(private _dialog: MatDialog) {}

  className: any;

  openDialog(): void {
    const dialogRef = this._dialog.open(AddclassComponent, {
      // width: '450px',
      data: { className: this.className }
      // hasBackdrop: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.className = result;
      console.log(this, this.className);
    });
  }

  ngOnInit() {}
}
