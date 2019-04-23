import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "../../../../utils/services/auth/auth.service";

@Component({
  selector: "app-classrooms",
  templateUrl: "./classrooms.component.html",
  styleUrls: ["./classrooms.component.scss"]
})
export class ClassroomsComponent implements OnInit {
  constructor(private _afs: AngularFirestore, private _auth: AuthService) {}

  ngOnInit() {}
  addAnnouncement() {
    // this._afs.collection('notifications').add({title: 'check', body:'notification', token: 'students_token'})
  }
}
