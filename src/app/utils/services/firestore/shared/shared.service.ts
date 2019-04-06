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

  getAcademyDetails(academyId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .get();
  }

  getAppliedForAcademies() {
    if (this.user) {
      return this.afs
        .collection(`${this.user.userType}s`)
        .doc(this.user.uid)
        .get();
    } else {
      return of(null);
    }
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
      .get();
    // .snapshotChanges()
    // .pipe(
    //   map(res => {
    //     return res.map(data => {
    //       if (data) return data.payload.doc.data();
    //       else of(null);
    //     });
    //   })
    // );
  }

  getApprovedRequests(academyId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('requests', ref =>
        ref
          .where('userId', '==', this.user.uid)
          .where('status', '==', 'approved')
      )
      .get();
    // .snapshotChanges()
    // .pipe(
    //   map(res => {
    //     return res.map(data => {
    //       if (data) return data.payload.doc.data();
    //       else of(null);
    //     });
    //   })
    // );
  }

  getRejectedRequests(academyId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('requests', ref =>
        ref
          .where('userId', '==', this.user.uid)
          .where('status', '==', 'rejected')
      )
      .get();
    // .snapshotChanges()
    // .pipe(
    //   map(res => {
    //     return res.map(data => {
    //       if (data) return data.payload.doc.data();
    //       else of(null);
    //     });
    //   })
    // );
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
          // delete payload[i].academyId;
          const response = this.afs
            .collection('academies')
            .doc(academyId)
            .collection('requests')
            .add(payload[i]);
          response.then(data => {
            res.push(data.path);
          });
          this.updateUserPendingRequests(academyId);
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

  cancelRequest(academyId, subjectId) {
    return new Promise((resolve, reject) => {
      this.afs
        .collection('academies')
        .doc(academyId)
        .collection('requests', ref =>
          ref
            .where('userId', '==', this.user.uid)
            .where('subjectId', '==', subjectId)
        )
        .get()
        .subscribe(
          res => {
            res.forEach(record => {
              record.ref.delete();
            });
            resolve(res);
          },
          error => {
            reject(error);
          }
        );
    });
  }
}
