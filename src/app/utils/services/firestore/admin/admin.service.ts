import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  user: any;
  constructor(private afs: AngularFirestore, private _auth: AuthService) {
    this._auth.user.subscribe(user => {
      this.user = user;
    });
  }

  // !! Class Methods
  // !! Class Methods
  // !! Class Methods

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

  // !! Subject Methods
  // !! Subject Methods
  // !! Subject Methods

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

  getSubjectsAgainstClass(classId) {
    return this.afs
      .collection(`academies`)
      .doc(`${this.user.uid}`)
      .collection(`subjects`, ref => ref.where('classRef', '==', classId))
      .get();
  }
  getStudentsAgainstClass(classId) {
    return this.afs
      .collection(`academies`)
      .doc(`${this.user.uid}`)
      .collection(`students`, ref => ref.where('classId', '==', classId))
      .get();
  }
  getTeachersAgainstClass(classId) {
    return this.afs
      .collection(`academies`)
      .doc(`${this.user.uid}`)
      .collection(`teachers`, ref => ref.where('classId', '==', classId))
      .get();
  }
  getClassroomsAgainstClass(classId) {
    return this.afs
      .collection(`academies`)
      .doc(`${this.user.uid}`)
      .collection(`classrooms`, ref =>
        ref.where('class.classId', '==', classId)
      )
      .get();
  }

  deleteSubject(subjectId) {
    return this.afs
      .collection(`academies`)
      .doc(`${this.user.uid}`)
      .collection(`subjects`)
      .doc(subjectId)
      .delete();
  }

  getTeacherRequests(status) {
    return this.afs
      .collection('academies')
      .doc(this.user.uid)
      .collection('requests', ref =>
        ref.where('userType', '==', 'teacher').where('status', '==', status)
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

  getStudentRequests(status) {
    return this.afs
      .collection('academies')
      .doc(this.user.uid)
      .collection('requests', ref =>
        ref.where('userType', '==', 'student').where('status', '==', status)
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

  async updateRequestStatus(requestId, requestStatus, request?) {
    this.afs
      .collection('academies')
      .doc(this.user.uid)
      .collection('requests')
      .doc(requestId)
      .update({ status: requestStatus })
      .then(() => {
        if (requestStatus == 'approved' && request.data.userType == 'teacher') {
          return this.addTeacher(request);
        }
        if (requestStatus == 'approved' && request.data.userType == 'student') {
          return this.addStudent(request);
        }
      });
  }

  private addTeacher(request) {
    const payload = {
      teacherId: request.data.userId,
      classId: request.data.classId,
      className: request.data.className,
      subjectName: request.data.subjectName,
      teacherName: request.data.userName,
      subjectId: request.data.subjectId,
      addedOn: new Date()
    };
    return this.afs
      .collection('academies')
      .doc(this.user.uid)
      .collection('teachers')
      .add(payload);
  }

  private addStudent(request) {
    const payload = {
      studentId: request.data.userId,
      classId: request.data.classId,
      className: request.data.className,
      subjectName: request.data.subjectName,
      studentName: request.data.userName,
      subjectId: request.data.subjectId,
      addedOn: new Date()
    };
    return this.afs
      .collection('academies')
      .doc(this.user.uid)
      .collection('students')
      .add(payload);
  }

  getTeachers() {
    return this.afs
      .collection('academies')
      .doc(this.user.uid)
      .collection('teachers')
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { id: data.payload.doc.id, data: data.payload.doc.data() };
          });
        })
      );
  }

  deleteTeacher(docId) {
    return this.afs
      .collection('academies')
      .doc(this.user.uid)
      .collection('teachers')
      .doc(docId)
      .delete();
  }

  getStudents() {
    return this.afs
      .collection('academies')
      .doc(this.user.uid)
      .collection('students')
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { id: data.payload.doc.id, data: data.payload.doc.data() };
          });
        })
      );
  }

  createClassroom(classroom) {
    return this.afs
      .collection('academies')
      .doc(this.user.uid)
      .collection('classrooms')
      .add(classroom);
  }

  getClassrooms() {
    return this.afs
      .collection('academies')
      .doc(this.user.uid)
      .collection('classrooms')
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { id: data.payload.doc.id, data: data.payload.doc.data() };
          });
        })
      );
  }

  deleteClassroom(id: string) {
    return this.afs
      .collection(`academies`)
      .doc(`${this.user.uid}`)
      .collection(`classrooms`)
      .doc(id)
      .delete();
  }

  subjectHasClassroom(subjectId) {
    return this.afs
      .collection('academies')
      .doc(this.user.uid)
      .collection('classrooms', ref =>
        ref.where('subject.subjectId', '==', subjectId)
      )
      .valueChanges();
  }

  updateSubjectDeletionReferences(subjectId) {}

  deleteSubjectFromStudents(subjecctId) {
    // return this.afs.collection('academies').doc(this.user.uid).collection('students', ref => ref.where('subjectId', '==', subjecctId)).
  }
  deleteSubjectFromClasses(subjecctId) {}
  deleteSubjectFromClassrooms(subjecctId) {}
}
