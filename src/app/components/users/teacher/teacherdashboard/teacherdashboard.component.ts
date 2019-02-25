import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-teacherdashboard',
  templateUrl: './teacherdashboard.component.html',
  styleUrls: ['./teacherdashboard.component.css']
})
export class TeacherdashboardComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar, private _dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {}
}
