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
  constructor(private afs: AngularFirestore) {}

  getAcademies() {
    console.log('gonna fetch academies');
    // this.academies = this.afs.collection('academies').get();
    return this.afs.collection('academies').get();
  }

  getClassesDetails(academyId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classes')
      .get();
  }
  getSubjectsDetails(academyId) {
    this.afs
      .collection('academies')
      .doc(academyId)
      .collection('subjects')
      .get()
      .forEach(snap => {
        snap.docs.forEach(doc => {
          console.log(doc.data());
        });
      });
  }
  getSubjects(academyId, subjectId) {
    return this.afs.collection('academies').doc(academyId);
  }
}
