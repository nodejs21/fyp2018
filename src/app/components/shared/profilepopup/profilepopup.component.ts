import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../../utils/services/auth/auth.service';

@Component({
  selector: 'app-profilepopup',
  templateUrl: './profilepopup.component.html',
  styleUrls: ['./profilepopup.component.scss']
})
export class ProfilepopupComponent implements OnInit {
  user;
  id;

  constructor(
    public dialogRef: MatDialogRef<ProfilepopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _auth: AuthService
  ) {
    this.id = data;
  }

  ngOnInit() {
    this._auth.getUser(this.id).subscribe(user => {
      this.user = user;
    });
  }
}
