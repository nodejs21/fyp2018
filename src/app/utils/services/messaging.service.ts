import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { take } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  messaging = firebase.messaging();

  constructor(
    private db: AngularFirestore,
    private _auth: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  updateToken(user, token) {
    this.db
      .collection('users')
      .doc(user.uid)
      .update({ token: firebase.firestore.FieldValue.arrayUnion(token) });
  }

  getPermission(user) {
    this.messaging
      .requestPermission()
      .then(() => {
        return this.messaging.getToken();
      })
      .then(token => {
        this.updateToken(user, token);
      })
      .catch(err => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  monitorRefresh(user) {
    this.messaging.onTokenRefresh(() => {
      this.messaging
        .getToken()
        .then(refreshedToken => {
          console.log('Token refreshed.');
          this.updateToken(user, refreshedToken);
        })
        .catch(err => console.log(err, 'Unable to retrieve new token'));
    });
  }

  async deleteMyToken(user) {
    const token = await this.messaging.getToken();
    console.log('TOKEN', token);
    this.db
      .collection('users')
      .doc(user.uid)
      .update({ token: firebase.firestore.FieldValue.arrayRemove(token) });
  }

  receiveMessage() {
    this.messaging.onMessage(payload => {
      console.log(payload);
      this.playNotificationSound();
      this._snackBar.open(payload.body, 'X', { duration: 4000 });
    });
  }

  playNotificationSound() {
    let audio = new Audio();
    audio.src = '../../../assets/sounds/notification.mp3';
    audio.load();
    audio.play();
  }
}
