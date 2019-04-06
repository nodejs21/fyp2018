import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../../utils/services/firestore/shared/shared.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-requestssent',
  templateUrl: './requestssent.component.html',
  styleUrls: ['./requestssent.component.scss']
})
export class RequestssentComponent implements OnInit {
  user;
  pendingRequests = [];
  approvedRequests = [];
  rejectedRequests = [];
  pTemp = [];
  requestedAcademies;
  requestTypes = ['pending', 'approved', 'rejected'];
  selectedType;
  requestsToBeShown;
  academies = [];

  constructor(public _shared: SharedService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this._shared.getAppliedForAcademies().subscribe(res => {
      if (res) {
        this.requestedAcademies = res.data().requests;
        this.requestedAcademies.forEach(academyId => {
          this.academies.push(academyId);
        });
        this.fetchRequests();
      }
    });
  }

  fetchRequests() {
    this.pendingRequests = [];
    this.approvedRequests = [];
    this.rejectedRequests = [];
    this.academies.forEach(academyId => {
      this.getRequests(academyId);
    });
  }

  getRequests(academyId) {
    this._shared.getPendingRequests(academyId).subscribe(requests => {
      requests.docs.forEach(request => {
        this.pendingRequests.push(request.data());
      });
      // this.pendingRequests.push.apply(this.pendingRequests, requests);
    });
    this._shared.getApprovedRequests(academyId).subscribe(requests => {
      requests.docs.forEach(request => {
        this.approvedRequests.push(request.data());
      });
      // this.approvedRequests.push.apply(this.approvedRequests, requests);
    });
    this._shared.getRejectedRequests(academyId).subscribe(requests => {
      requests.docs.forEach(request => {
        this.rejectedRequests.push(request.data());
      });
      // this.rejectedRequests.push.apply(this.rejectedRequests, requests);
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

  cancelRequest(request) {
    this._shared
      .cancelRequest(request.academyId, request.subjectId)
      .then(res => {
        this.fetchRequests();
        this.showRequests(this.selectedType);
        this.showSnackBar(`Your request has been cancelled!`);
      })
      .catch(error => {
        console.error(error);
      });
  }

  showSnackBar(message) {
    this._snackBar.open(message, 'X', { duration: 4000 });
  }

  trackBySubjectId(index, request) {
    return request.subjectId;
  }
}
