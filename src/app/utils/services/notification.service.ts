import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { app } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  token: any;
  constructor(
    private afMessaging: AngularFireMessaging,
    private fun: AngularFireFunctions
  ) {
    try {
      const _messaging = app.messaging();
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    } catch (e) {
      console.error(e);
    }
  }

  getPermission(): Observable<any> {
    return this.afMessaging.requestToken.pipe(
      tap(token => (this.token = token))
    );
  }

  showMessages(): Observable<any> {
    return this.afMessaging.messages.pipe(
      tap(msg => {
        const body: any = (msg as any).notification.body;
        console.log(body);
      })
    );
  }
}
