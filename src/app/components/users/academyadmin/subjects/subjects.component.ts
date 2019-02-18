import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  constructor(private _router: Router, private _route: ActivatedRoute) {
    console.log(this._route.snapshot.paramMap);
  }

  ngOnInit() {}
}
