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
    // const adminRef = db.doc('admins/McTypcvnLIUUXBdQbd6Sryjjnw22').get();
    // const adminSnap = await adminRef;
    // const adminData = adminSnap.data();
    // const token = adminData.token;
    console.log(notification.token);
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
    // const adminRef = db.doc('admins/McTypcvnLIUUXBdQbd6Sryjjnw22').get();
    // const adminSnap = await adminRef;
    // const adminData = adminSnap.data();
    // const token = adminData.token;
    const studentTokens = classRoomData.students.map(student => {
      return admin
        .firestore()
        .collection('users')
        .doc(student.studentId)
        .get()
        .then(snap => {
          console.log(snap.data);
          return snap.data.token;
        });
    });

    console.log(studentTokens);
    studentTokens.forEach(tok => {
      admin
        .firestore()
        .collection('notifications')
        .add({
          body: 'You are added to classroom',
          title: 'Class Created',
          token: tok
        });
    });
  });

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});
