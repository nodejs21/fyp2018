import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { until } from 'protractor';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  user: any;
  constructor(private afs: AngularFirestore, private _auth: AuthService) {
    this._auth.user.subscribe(user => {
      console.log(user);
      this.user = user;
    });
  }

  addClass(className) {
    return this.afs
      .collection(`academies`)
      .doc(`${this.user.uid}`)
      .collection(`classes`)
      .add({ className: className });
  }

  getClasses() {
    return this.afs
      .collection(`academies`)
      .doc(`${this.user.uid}`)
      .collection(`classes`)
      .snapshotChanges();
    // .pipe(
    //   map(res => {
    //     res.map(data => {
    //       console.log(data);
    //       console.log(data.payload.doc);
    //     });
    //   })
    // );
  }

  deleteClass(classId) {
    return this.afs
      .collection(`academies`)
      .doc(`${this.user.uid}`)
      .collection(`classes`)
      .doc(classId)
      .delete();
  }
}
