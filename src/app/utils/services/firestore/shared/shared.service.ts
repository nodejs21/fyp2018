import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { firestore } from 'firebase';

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

  applyForSubjects(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = [];
        for (var i = 0; i < payload.length; i++) {
          payload[i].userId = this.user.uid;
          payload[i].status = 'pending';
          payload[i].userType = this.user.userType;
          const academyId = payload[i].academyId;
          delete payload[i].academyId;
          const response = this.afs
            .collection('academies')
            .doc(academyId)
            .collection('requests')
            .add(payload[i]);
          this.updateUserPendingRequests(academyId);
          res.push(response);
        }
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  private updateUserPendingRequests(academyId) {
    this.afs
      .collection(`${this.user.userType}s`)
      .doc(this.user.uid)
      .ref.update({ requests: firestore.FieldValue.arrayUnion(academyId) });
  }
}
