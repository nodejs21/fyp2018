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

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});
