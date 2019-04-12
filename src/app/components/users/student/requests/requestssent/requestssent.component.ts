import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../utils/services/auth/auth.service';
import { SharedService } from '../../../../../utils/services/firestore/shared/shared.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'requestssent',
  templateUrl: './requestssent.component.html',
  styleUrls: ['./requestssent.component.css']
})
export class RequestssentComponent implements OnInit {
  user;
  pendingRequests = [];
  approvedRequests = [];
  rejectedRequests = [];
  pTemp = [];
  requestedAcademies;
  requestTypes = ['pending', 'approved', 'rejected'];
  selectedType = 'pending';
  requestsToBeShown;
  academies = [];

  constructor(
    private _auth: AuthService,
    public _shared: SharedService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this._shared.getAppliedForAcademies().subscribe(res => {
        this.requestedAcademies = res.data().requests;
        this.requestedAcademies.forEach(academyId => {
          this.academies.push(academyId);
        });
        this.fetchRequests();
      });
    });
  }

  fetchRequests() {
    this.academies.forEach(academyId => {
      this.getRequests(academyId);
    });
  }

  getRequests(academyId) {
    this._shared.getPendingRequests(academyId).subscribe(requests => {
      this.pendingRequests = requests;
    });
    this._shared.getApprovedRequests(academyId).subscribe(requests => {
      this.approvedRequests = requests;
    });
    this._shared.getRejectedRequests(academyId).subscribe(requests => {
      this.rejectedRequests = requests;
    });
  }

  cancelRequest(request) {
    this._shared
      .cancelRequest(request.data.academyId, request.data.subjectId)
      .then(res => {
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
