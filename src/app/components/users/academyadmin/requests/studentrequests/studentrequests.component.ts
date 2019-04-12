import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../utils/services/auth/auth.service';
import { AdminService } from '../../../../../utils/services/firestore/admin/admin.service';

@Component({
  selector: 'app-studentrequests',
  templateUrl: './studentrequests.component.html',
  styleUrls: ['./studentrequests.component.scss']
})
export class StudentrequestsComponent implements OnInit {
  selectedType = 'pending';
  pendingRequests = [];
  approvedRequests = [];
  rejectedRequests = [];
  requestTypes = ['pending', 'approved', 'rejected'];
  requestsToBeShown;
  constructor(private _auth: AuthService, public _admin: AdminService) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this._admin.getStudentRequests('pending').subscribe(res => {
        this.pendingRequests = res;
      });
      this._admin.getStudentRequests('approved').subscribe(res => {
        this.approvedRequests = res;
      });
      this._admin.getStudentRequests('rejected').subscribe(res => {
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
