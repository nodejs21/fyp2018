import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../../utils/services/firestore/shared/shared.service';

@Component({
  selector: 'app-requestssent',
  templateUrl: './requestssent.component.html',
  styleUrls: ['./requestssent.component.scss']
})
export class RequestssentComponent implements OnInit {
  pendingRequests = [];
  approvedRequests = [];
  rejectedRequests = [];

  constructor(public _shared: SharedService) {}

  ngOnInit() {
    // this._shared.getApprovedRequests();
    // this._shared.getPendingRequests().subscribe(res => {
    // })
  }
}
