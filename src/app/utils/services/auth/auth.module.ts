import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [],
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
