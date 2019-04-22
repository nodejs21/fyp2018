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
