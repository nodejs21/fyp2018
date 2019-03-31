import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  academies: Observable<any>;
  teacher: any;
  constructor(private afs: AngularFirestore, private _auth: AuthService) {
    this._auth.user.subscribe(user => {
      this.teacher = user;
    });
  }

  getAcademies() {
    console.log('gonna fetch academies');
    return this.afs.collection('academies').get();
  }

  getClassesDetails(academyId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classes')
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return {
              classId: data.payload.doc.id,
              data: data.payload.doc.data()
            };
          });
        })
      );
  }
  getSubjectsDetails(academyId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('subjects')
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { id: data.payload.doc.id, data: data.payload.doc.data() };
          });
        })
      );
  }
  getSubjects(academyId, subjectId) {
    return this.afs.collection('academies').doc(academyId);
  }

  applyForSubjects(payload) {
    console.log(payload);
    delete payload.academyId;
    console.log(payload);
    this.afs
      .collection('academies')
      .doc(payload.academyId)
      .collection('requests')
      .doc('teachers')
      .collection('pending')
      .doc(this.teacher.uid)
      .set(payload, { merge: true });
  }
}
