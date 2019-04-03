import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  user;
  constructor(private afs: AngularFirestore, private _auth: AuthService) {
    this._auth.user.subscribe(user => {
      this.user = user;
    });
  }

  getPendingRequests(academyId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('requests', ref =>
        ref
          .where('userId', '==', this.user.uid)
          .where('status', '==', 'pending')
      )
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            if (data) return data.payload.doc.data();
            else of(null);
          });
        })
      );
  }

  getApprovedRequests(academyId) {
    const alreadyApplied = this.afs
      .collection('academies')
      .doc(academyId)
      .collection('requests', ref =>
        ref
          .where('userId', '==', this.user.uid)
          .where('status', '==', 'approved')
      );
    alreadyApplied.get().subscribe(res =>
      res.docs.map(doc => {
        console.log(doc.data());
      })
    );
  }

  getRejectedRequests(academyId) {
    const alreadyApplied = this.afs
      .collection('academies')
      .doc(academyId)
      .collection('requests', ref =>
        ref
          .where('userId', '==', this.user.uid)
          .where('status', '==', 'rejected')
      );
    alreadyApplied.get().subscribe(res =>
      res.docs.map(doc => {
        console.log(doc.data());
      })
    );
  }
}
