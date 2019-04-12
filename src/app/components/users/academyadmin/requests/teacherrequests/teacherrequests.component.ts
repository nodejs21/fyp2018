import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../../utils/services/firestore/admin/admin.service';
import { AuthService } from '../../../../../utils/services/auth/auth.service';

@Component({
  selector: 'app-teacherrequests',
  templateUrl: './teacherrequests.component.html',
  styleUrls: ['./teacherrequests.component.scss']
})
export class TeacherrequestsComponent implements OnInit {
  selectedType = 'pending';
  pendingRequests = [];
  approvedRequests = [];
  rejectedRequests = [];
  requestTypes = ['pending', 'approved', 'rejected'];
  requestsToBeShown;
  constructor(private _auth: AuthService, public _admin: AdminService) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this._admin.getTeacherRequests('pending').subscribe(res => {
        this.pendingRequests = res;
      });
      this._admin.getTeacherRequests('approved').subscribe(res => {
        this.approvedRequests = res;
      });
      this._admin.getTeacherRequests('rejected').subscribe(res => {
        this.rejectedRequests = res;
      });
    });
  }

  showRequests(type) {
    this.requestsToBeShown = [];
    if (type === 'pending') {
      this.requestsToBeShown = this.pendingRequests;
    } else if (type === 'approved') {
      this.requestsToBeShown = this.approvedRequests;
    } else {
      this.requestsToBeShown = this.rejectedRequests;
    }
    console.log(this.requestsToBeShown);
  }

  updateRequestStatus(requestId, status, request?) {
    this._admin
      .updateRequestStatus(requestId, status, request)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
