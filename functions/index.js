const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//! Req URL: https://us-central1-fyp2018-6ddeb.cloudfunctions.net/helloWorld

exports.updateClassesCollectionOnSubjectCreate = functions.firestore
  .document('academies/{academyId}/subjects/{subjectId}')
  .onCreate((snap, context) => {
    admin
      .firestore()
      .collection('academies')
      .doc(context.params.academyId)
      .collection('classes')
      .doc(snap.data().classRef)
      .update({
        subjects: admin.firestore.FieldValue.arrayUnion(
          context.params.subjectId
        )
      });
  });

exports.updateClassesCollectionOnSubjectDelete = functions.firestore
  .document('academies/{academyId}/subjects/{subjectId}')
  .onDelete((snap, context) => {
    admin
      .firestore()
      .collection('academies')
      .doc(context.params.academyId)
      .collection('classes')
      .doc(snap.data().classRef)
      .update({
        subjects: admin.firestore.FieldValue.arrayRemove(
          context.params.subjectId
        )
      });
  });

exports.deleteSubjectsOnClassDelete = functions.firestore
  .document('academies/{academyId}/classes/{classId}')
  .onDelete((snap, context) => {
    admin
      .firestore()
      .collection('academies')
      .doc(context.params.academyId)
      .collection('subjects')
      .where('classRef', '==', context.params.classId)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          doc.ref.delete();
        });
      });
  });

exports.oneToOneNotificatioin = functions.firestore
  .document('notifications/{notificationId}')
  .onCreate(async (snapshot, context) => {
    const notification = snapshot.data();
    console.log(notification);

    const payload = {
      notification: {
        title: notification.title,
        body: notification.body
      }
    };

    return admin.messaging().sendToDevice(notification.token, payload);
  });

exports.classNotifications = functions.firestore
  .document('academies/{academyId}/classrooms/{classroomId}')
  .onCreate(async (snapshot, context) => {
    const classRoomData = await snapshot.data();
    const academyRef = await admin
      .firestore()
      .collection('academies')
      .doc(context.params.academyId)
      .get();
    const academyData = academyRef.data();
    const studentsData = classRoomData.students.map(student => {
      return admin
        .firestore()
        .collection('users')
        .doc(student.studentId)
        .get()
        .then(snap => {
          const data = snap.data();
          return data;
        });
    });

    console.log(studentsData);
    const studentPromises = await Promise.all(studentsData);
    console.log(studentPromises);

    const allTokens = studentPromises.reduce((acc, student) => {
      console.log(student, 'STD');
      if (student.token.length > 0) {
        return [...acc, student.token[0]];
      } else return acc;
    }, []);

    console.log(allTokens);

    allTokens.forEach(tok => {
      admin
        .firestore()
        .collection('notifications')
        .add({
          body: `You are added to class ${
            classRoomData.subject.subjectName
          } in ${academyData.academyName} academy`,
          title: `Class Created`,
          token: tok
        });
    });
  });

exports.requestNotification = functions.firestore
  .document('academies/{academyId}/requests/{requestId}')
  .onCreate(async (snapshot, context) => {
    const userRef = await admin
      .firestore()
      .collection('users')
      .doc(context.params.academyId)
      .get();
    const userData = userRef.data();

    admin
      .firestore()
      .collection('notifications')
      .add({
        body: `You have new join request`,
        title: `Join Request`,
        token: userData.token[0]
      });
  });

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});
