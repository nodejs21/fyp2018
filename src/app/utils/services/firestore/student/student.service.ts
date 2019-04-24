import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private _afs: AngularFirestore) {}

  joinClass(roomId) {
    return this._afs
      .collection('rtc', ref => ref.where('senderId', '==', roomId))
      .stateChanges(['added'])
      .pipe(
        map(actions =>
          actions.map(a => {
            return { id: a.payload.doc.id, data: a.payload.doc.data() };
          })
        )
      );
  }

  submitAssignment(academyId, classroomId, student) {
    return this._afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('assignments')
      .doc(student.studentId)
      .set(
        {
          student
        },
        { merge: true }
      );
  }
}
