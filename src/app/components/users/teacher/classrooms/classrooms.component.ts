import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../utils/services/firestore/shared/shared.service';
import { AuthService } from '../../../../utils/services/auth/auth.service';

@Component({
  selector: "app-classrooms",
  templateUrl: "./classrooms.component.html",
  styleUrls: ["./classrooms.component.scss"]
})
export class ClassroomsComponent implements OnInit {
  approvedRequests;
  classrooms;
  selectedAcademy;
  constructor(private _shared: SharedService, private _auth: AuthService) {}

  ngOnInit() {
    this._auth.user.subscribe(async user => {
      await this.getApprovedRequests().then(requests => {
        this.approvedRequests = requests;
      });
    });
  }

  getAcademyData(academy) {
    console.log(academy);
    this._shared.getClassrooms(academy.data.academyId).subscribe(classrooms => {
      this.classrooms = classrooms;
      console.log(this.classrooms);
    });
  }

  getApprovedRequests() {
    var temp = [];
    return new Promise((resolve, reject) => {
      {
        this._shared.getUserRequests().subscribe(userInfo => {
          if (!userInfo['requests']) return;
          userInfo['requests'].forEach(async request => {
            await this._shared
              .getApprovedRequests(request.academyId)
              .subscribe(request => {
                temp.push(request);
              });
          });
          resolve(temp);
        });
      }
    });
  }
}
