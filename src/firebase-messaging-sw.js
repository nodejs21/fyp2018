'use strict';
importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/4.13.0/firebase-messaging.js'
);

firebase.initializeApp({
  messagingSenderId: '3821117805'
});

const messaging = firebase.messaging();
const permission = await requestNotificationPermission();

messaging
  .requestPermission()
  .then(function() {
    MsgElem.innerHTML = 'Notification permission granted.';
    console.log('Notification permission granted.');

    // get the token in the form of promise
    return messaging.getToken();
  })
  .then(function(token) {
    TokenElem.innerHTML = 'token is : ' + token;
  })
  .catch(function(err) {
    ErrElem.innerHTML = ErrElem.innerHTML + '; ' + err;
    console.log('Unable to get permission to notify.', err);
  });

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
