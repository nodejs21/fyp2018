import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'confirmdeletion',
  templateUrl: './confirmdeletion.component.html',
  styleUrls: ['./confirmdeletion.component.css']
})
export class ConfirmdeletionComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}
}
