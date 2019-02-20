import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';

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
      .doc(`${classId}`)
      .update({ className });
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

  //!! Subject Methods
  //!! Subject Methods
  //!! Subject Methods

  addSubject(subjectName) {
    // return this.afs
    //   .collection(`academies`)
    //   .doc(`${this.user.uid}`)
    //   .collection(`subjects`)
    //   .add({ subjectName });
    console.log(subjectName);
  }

  updateSubject(subjectId, subjectName) {
    // return this.afs
    //   .collection(`academies`)
    //   .doc(`${this.user.uid}`)
    //   .collection(`subjects`)
    //   .doc(`${subjectId}`)
    //   .update({ subjectName });
    console.log(subjectId, subjectName);
  }

  getSubjects() {
    return this.afs
      .collection(`academies`)
      .doc(`${this.user.uid}`)
      .collection(`subjects`)
      .snapshotChanges();
  }

  deleteSubject(subjectId) {
    // return this.afs
    //   .collection(`academies`)
    //   .doc(`${this.user.uid}`)
    //   .collection(`subjects`)
    //   .doc(subjectId)
    //   .delete();
    console.log(subjectId);
  }
}
