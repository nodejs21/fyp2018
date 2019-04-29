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

  // getTeacherClasses(teacherId) {
  //   return this.afs
  //     .collection('academies')
  //     .doc(academyId)
  //     .collection('subjects')
  //     .snapshotChanges()
  //     .pipe(
  //       map(res => {
  //         return res.map(data => {
  //           return { id: data.payload.doc.id, data: data.payload.doc.data() };
  //         });
  //       })
  //     );
  // }

  getSubjects(academyId) {
    return this.afs.collection('academies').doc(academyId);
  }

  createQuiz(academyId, classroomId, quiz: any) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('quizzes')
      .add(quiz);
  }

  getSubmittedQuizzes(academyId, classroomId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('submittedquizzes')
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { id: data.payload.doc.id, ...data.payload.doc.data() };
          });
        })
      );
  }

  getAllQuizzes(academyId, classroomId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('quizzes')
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { id: data.payload.doc.id, ...data.payload.doc.data() };
          });
        })
      );
  }

  createAssignment(assignment: any) {
    return this.afs
      .collection('academies')
      .doc(assignment.academy.academyId)
      .collection('classrooms')
      .doc(assignment.classRoom.classRoomId)
      .collection('assignments')
      .add(assignment);
  }

  getSubmittedAssignments(academyId, classroomId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('submittedassignments')
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { id: data.payload.doc.id, ...data.payload.doc.data() };
          });
        })
      );
  }

  uploadAssignmentMarks(academyId, classroomId, assignmentId, assignment) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('submittedassignments')
      .doc(assignment.id)
      .update(assignment);
  }

  updateAssignment(assignment: any, assignmentId) {
    return this.afs
      .collection('academies')
      .doc(assignment.academy.academyId)
      .collection('classrooms')
      .doc(assignment.classRoom.classRoomId)
      .collection('assignments')
      .doc(assignmentId)
      .update({ assignment });
  }

  deleteAssignment(academyId, classroomId, assignmentId) {
    return this.afs
      .collection('academies')
      .doc(academyId)
      .collection('classrooms')
      .doc(classroomId)
      .collection('assignments')
      .doc(assignmentId)
      .delete();
  }

  // applyForSubjects(payload) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       let res = [];
  //       for (var i = 0; i < payload.length; i++) {
  //         payload[i].userId = this.teacher.uid;
  //         payload[i].status = 'pending';
  //         payload[i].userType = 'teacher';
  //         const academyId = payload[i].academyId;
  //         delete payload[i].academyId;
  //         const response = this.afs
  //           .collection('academies')
  //           .doc(academyId)
  //           .collection('requests')
  //           .add(payload[i]);
  //         res.push(response);
  //       }
  //       resolve(res);
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // }
}
