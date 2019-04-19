import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { take } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  messaging = firebase.messaging();

  constructor(private db: AngularFirestore, private _auth: AuthService) {}

  updateToken(token) {
    this._auth.user.subscribe(user => {
      if (!user) return;

      this.db
        .collection('users')
        .doc(user.uid)
        .update({ token: token });
    });
  }

  getPermission() {
    this.messaging
      .requestPermission()
      .then(() => {
        return this.messaging.getToken();
      })
      .then(token => {
        this.updateToken(token);
      })
      .catch(err => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage(payload => {
      this.playNotificationSound();
      alert(payload.title);
    });
  }

  playNotificationSound() {
    let audio = new Audio();
    audio.src = '../../../assets/sounds/notification.mp3';
    audio.load();
    audio.play();
  }
}
