import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getSubjects(academyId) {
    return this.afs.collection('academies').doc(academyId);
  }

  applyForSubjects(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = [];
        for (var i = 0; i < payload.length; i++) {
          payload[i].userId = this.teacher.uid;
          payload[i].status = 'pending';
          payload[i].userType = 'teacher';
          const academyId = payload[i].academyId;
          delete payload[i].academyId;
          const response = this.afs
            .collection('academies')
            .doc(academyId)
            .collection('requests')
            .add(payload[i]);
          res.push(response);
        }
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
}
