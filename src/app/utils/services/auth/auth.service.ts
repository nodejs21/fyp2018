import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.log(user.uid);
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.user = of(credential.user);
    });
    // return this.afAuth.auth.signInWithPopup(provider).then(credential => {
    //   // this.updateUserData(credential.user);
    // });
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    if (userRef.ref.id === 'undefined') {
      return;
    }
    const splittedName = this.splitDisplayName(user.displayName);

    const data: any = {
      uid: user.uid,
      email: user.email,
      firstName: splittedName[0],
      lastName: splittedName[1],
      photoURL: user.photoURL
    };

    console.log(data);

    return userRef.set(data, { merge: true });
  }

  splitDisplayName(displayName) {
    return displayName.split(' ');
  }

  signupWithEmailPassword(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async customSignUp(user, uid) {
    await this.pushUserToDb(user, uid);
    delete user.userBasicInfo.password;
    this.user = of(user.userBasicInfo);
    this.router.navigate(['/']);
  }

  private pushUserToDb(user, uid) {
    user.userBasicInfo.uid = uid;
    user.userSpecificInfo.uid = uid;
    user.userSpecificInfo.uid = uid;
    console.log(user);
    /* below if else statements ko refactor krna a */
    this.afs
      .collection('users')
      .doc(uid)
      .set(user.userBasicInfo);
    if (user.userBasicInfo.userType === 'teacher') {
      this.afs
        .collection('teachers')
        .doc(uid)
        .set(user.userSpecificInfo);
    } else if (user.userBasicInfo.userType === 'student') {
      this.afs
        .collection('students')
        .doc(uid)
        .set(user.userSpecificInfo);
    } else if (user.userBasicInfo.userType === 'academyadmin') {
      this.afs
        .collection('academyadmins')
        .doc(uid)
        .set(user.userSpecificInfo);
      this.afs
        .collection('academies')
        .doc(uid)
        .set(user.academyDetails);
    }
  }

  signIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
