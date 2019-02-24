import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

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

  //!! Class Methods
  //!! Class Methods
  //!! Class Methods

  addClass(className) {
    return this.afs
      .collection(`academies`)
      .doc(`${this.user.uid}`)
      .collection(`classes`)
      .add({ className });
  }

  updateClass(classId, className) {
    return this.afs
      .collection(`academies`)
      .doc(`${this.user.uid}`)
      .collection(`classes`)
      .doc(classId)
      .update({ className });
  }

  //todo Cloud Function for updating Classes Collection
  // cfUpdateClassesCollection(classId, subjectRef, push) {
  //   console.log(classId, subjectRef, push);
  //   var op = firebase.firestore.FieldValue.arrayRemove(subjectRef);
  //   if (push) {
  //     op = firebase.firestore.FieldValue.arrayUnion(subjectRef);
  //   }
  //   return this.afs
  //     .collection(`academies`)
  //     .doc(`${this.user.uid}`)
  //     .collection(`classes`)
  //     .doc(classId)
  //     .update({
  //       subjects: op
  //     });
  // }
  //todo Cloud Function for updating Classes Collection

  getClasses() {
    return this.afs
      .collection(`academies`)
      .doc(`${this.user.uid}`)
      .collection(`classes`)
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { id: data.payload.doc.id, data: data.payload.doc.data() };
          });
        })
      );
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

  //!! Subject Methods
  //!! Subject Methods
  //!! Subject Methods

  addSubject(classRef, subjectName) {
    return this.afs
      .collection(`academies`)
      .doc(`${this.user.uid}`)
      .collection(`subjects`)
      .add({ subjectName, classRef });
  }

  updateSubject(subjectId, subjectName) {
    return this.afs
      .collection(`academies`)
      .doc(`${this.user.uid}`)
      .collection(`subjects`)
      .doc(subjectId)
      .update({ subjectName });
  }

  //todo Cloud Function for updating Classes Collection
  // cfUpdateSubjectsCollection(subjectId, classRef, push) {
  //   return this.afs
  //     .collection(`academies`)
  //     .doc(`${this.user.uid}`)
  //     .collection(`subjects`, ref => ref.where('classId', '==', classRef));
  // }
  //todo Cloud Function for updating Classes Collection

  getSubjects() {
    return this.afs
      .collection(`academies`)
      .doc(`${this.user.uid}`)
      .collection(`subjects`)
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { id: data.payload.doc.id, data: data.payload.doc.data() };
          });
        })
      );
  }

  deleteSubject(subjectId) {
    return this.afs
      .collection(`academies`)
      .doc(`${this.user.uid}`)
      .collection(`subjects`)
      .doc(subjectId)
      .delete();
  }
}
