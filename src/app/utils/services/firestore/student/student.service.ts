import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';

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

  submitAssignment(academyId, classroomId, assignment) {
    return this._afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('submittedassignments')
      .add(assignment);
  }

  getSubmittedAssignmentsDetails(academyId, classroomId, studentId) {
    return this._afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('submittedassignments', ref =>
        ref.where('studentId', '==', studentId)
      )
      .valueChanges();
  }

  getQuizzes(academyId, classroomId) {
    return this._afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('quizzes')
      .valueChanges();
  }
}
