import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';
import { Observable, Subject } from 'rxjs';

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
    return this.afs
      .collection(`${this.user.userType}s`)
      .doc(this.user.uid)
      .get();
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
            return { id: data.payload.doc.id, data: data.payload.doc.data() };
          });
        })
      );
    // .get();
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
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { id: data.payload.doc.id, data: data.payload.doc.data() };
          });
        })
      );
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
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { id: data.payload.doc.id, data: data.payload.doc.data() };
          });
        })
      );
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
    console.log(payload);

    return new Promise(async (resolve, reject) => {
      try {
        let res = [];
        for (var i = 0; i < payload.length; i++) {
          payload[i].userId = this.user.uid;
          payload[i].status = 'pending';
          payload[i].userType = this.user.userType;
          payload[i].userName = this.user.firstName + ' ' + this.user.lastName;
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
          this.updateUserPendingRequests({
            academyName: payload[i].academyName,
            academyId
          });
        }
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  private updateUserPendingRequests(academy) {
    this.afs
      .collection(`${this.user.userType}s`)
      .doc(this.user.uid)
      .ref.update({ requests: firestore.FieldValue.arrayUnion(academy) });
  }

  getUserRequests() {
    return this.afs
      .collection(`${this.user.userType}s`)
      .doc(this.user.uid)
      .valueChanges();
  }

  getAssignments(academyId, classroomId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('assignments');
  }

  // getAssignmentDetails(assignmentId) {
  //   return this.afs.collection('academies').doc()
  // }

  getClassrooms(academyId) {
    return this.afs
      .collection(`academies`)
      .doc(academyId)
      .collection('classrooms', ref =>
        ref.where('teacher.teacherId', '==', this.user.uid)
      )
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { id: data.payload.doc.id, data: data.payload.doc.data() };
          });
        })
      );
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

  sendOffer(senderId: any, offer: {}) {
    return this.afs
      .collection('rtc')
      .doc(`offer${senderId}`)
      .set({ senderId, offer: JSON.stringify(offer), type: 'offer' });
  }

  sendAnswer(senderId: any, offer: {}) {
    return this.afs
      .collection('rtc')
      .doc(`answer${senderId}`)
      .set({ senderId, answer: JSON.stringify(offer), type: 'answer' });
  }

  getOffer(senderId: any) {
    console.log();

    return this.afs
      .collection('rtc', ref =>
        ref.where('senderId', '==', senderId).where('type', '==', 'offer')
      )
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { id: data.payload.doc.id, data: data.payload.doc.data() };
          });
        })
      );
  }

  getAnswer(senderId: any) {
    return this.afs
      .collection('rtc', ref =>
        ref.where('senderId', '==', senderId).where('type', '==', 'answer')
      )
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { id: data.payload.doc.id, data: data.payload.doc.data() };
          });
        })
      );
  }

  sendOfferCandidate(senderId, candidate: {}) {
    return this.afs
      .collection('rtc')
      .doc(`offercandidate${senderId}`)
      .set({ senderId, candidate });
  }
  getOfferCandidate(senderId) {
    return this.afs
      .collection('rtc')
      .doc(`offercandidate${senderId}`)
      .get();
  }
  sendAnswerCandidate(senderId, candidate: {}) {
    return this.afs
      .collection('rtc')
      .doc(`answercandidate${senderId}`)
      .set({ senderId, candidate });
  }
  getAnswerCandidate(senderId) {
    return this.afs
      .collection('rtc')
      .doc(`answercandidate${senderId}`)
      .get();
  }

  getPermission(teacherId) {
    return this.afs
      .collection('permission')
      .doc(this.user.uid)
      .set({ studentId: this.user.uid, permission: false, teacherId });
  }

  checkPermission() {
    return this.afs
      .collection('permission')
      .doc(this.user.uid)
      .valueChanges();
  }

  givePermission(permit, teacherId) {
    return this.afs
      .collection('permission')
      .doc(this.user.uid)
      .set({ studentId: this.user.uid, permission: false, teacherId });
  }

  joinClass() {
    return this.afs
      .collection('liveclasses', ref =>
        ref.where('students', 'array-contains', this.user.uid)
      )
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { id: data.payload.doc.id, data: data.payload.doc.data() };
          });
        })
      );
  }

  updateLiveClass(classObj) {
    console.log(classObj);
    // return this.afs
    //   .collection('liveclasses')
    //   .doc(this.user.uid)
    //   .set({})
  }
}
