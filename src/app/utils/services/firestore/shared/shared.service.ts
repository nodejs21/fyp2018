import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';
import { map, merge } from 'rxjs/operators';
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

  getPostedAssignments(academyId, classroomId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('assignments')
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { id: data.payload.doc.id, data: data.payload.doc.data() };
          });
        })
      );
  }

  checkOnGoingClassroom(academyId, classroomId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('liveclass')
      .doc(academyId + '|' + classroomId)
      .valueChanges();
  }

  startLiveClass(academyId, classroomId) {
    console.log(academyId, classroomId);
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('liveclass')
      .doc(academyId + '|' + classroomId)
      .set(
        {
          startedAt: new Date(),
          status: true
        },
        { merge: true }
      );
    // .snapshotChanges()
    // .pipe(
    //   map(res => {
    //     return res.map(data => {
    //       return { id: data.payload.doc.id, data: data.payload.doc.data() };
    //     });
    //   })
    // );
  }

  getPreviousAttendance(academyId, classroomId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('liveclass')
      .doc(academyId + '|' + classroomId)
      .collection('students')
      .doc(this.user.uid)
      .valueChanges();
  }

  updateAttendance(academyId, classroomId, durationInClass) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('liveclass')
      .doc(academyId + '|' + classroomId)
      .collection('students')
      .doc(this.user.uid)
      .set({
        students: {
          studentId: this.user.uid,
          studentName: this.user.firstName + ' ' + this.user.lastName,
          durationInClass
        }
      });
  }

  studentsInClassroom(academyId, classroomId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('liveclass')
      .doc(academyId + '|' + classroomId)
      .collection('students')
      .valueChanges();
  }

  endLiveClassByTeacher(academyId, classroomId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('liveclass')
      .doc(academyId + '|' + classroomId)
      .set(
        {
          endedAt: new Date(),
          status: false
        },
        { merge: true }
      );
  }

  informStudentsOfClassroom(studentId, academyId, classroomId) {
    this.afs
      .collection('students')
      .doc(studentId)
      .set(
        {
          academyId,
          classroomId
        },
        { merge: true }
      );
  }

  getUpdatesOfLiveclass() {
    return this.afs
      .collection('students')
      .doc(this.user.uid)
      .valueChanges();
  }

  liveclassFinished(studentId) {
    this.afs
      .collection('students')
      .doc(studentId)
      .update({
        academyId: firestore.FieldValue.delete(),
        classroomId: firestore.FieldValue.delete()
      });
  }

  attendLiveClass(academyId, classroomId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('liveclass')
      .doc(`${academyId}|${classroomId}`)
      .valueChanges();
  }

  askPermission(academyId, classroomId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('liveclass')
      .doc(`${academyId}|${classroomId}`)
      .collection('questions')
      .doc(this.user.uid)
      .set(
        {
          studentId: this.user.uid,
          studentName: this.user.firstName + ' ' + this.user.lastName,
          permission: 'pending'
        },
        { merge: true }
      );
  }

  checkPermission(academyId, classroomId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('liveclass')
      .doc(`${academyId}|${classroomId}`)
      .collection('questions')
      .doc(this.user.uid)
      .valueChanges();
  }

  subscribeToQuestions(academyId, classroomId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('liveclass')
      .doc(`${academyId}|${classroomId}`)
      .collection('questions')
      .valueChanges();
  }

  givePermission(permit, academyId, classroomId, studentId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('liveclass')
      .doc(`${academyId}|${classroomId}`)
      .collection('questions')
      .doc(studentId)
      .update({
        permission: permit ? 'granted' : 'rejected'
      });
  }
  // getAssignmentDetails(assignmentId) {
  //   return this.afs.collection('academies').doc()
  // }

  getTeacherClassrooms(academyId) {
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

  getStudentClassrooms(academyId) {
    return this.afs
      .collection(`academies`)
      .doc(academyId)
      .collection('classrooms', ref =>
        ref.where('students', 'array-contains', {
          studentId: this.user.uid,
          studentName: this.user.firstName + ' ' + this.user.lastName
        })
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
    console.log(candidate);
    return this.afs
      .collection('rtc')
      .doc(`offercandidate${senderId}`)
      .set(
        {
          senderId,
          candidates: firestore.FieldValue.arrayUnion(candidate)
        },
        { merge: true }
      );
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
      .set(
        {
          senderId,
          candidates: firestore.FieldValue.arrayUnion(candidate)
        },
        { merge: true }
      );
  }
  getAnswerCandidate(senderId) {
    return this.afs
      .collection('rtc')
      .doc(`answercandidate${senderId}`)
      .get();
  }

  // getPermission(teacherId) {
  //   return this.afs
  //     .collection("permission")
  //     .doc(this.user.uid)
  //     .set({ studentId: this.user.uid, permission: false, teacherId });
  // }

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
