import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  academies: Observable<any>;
  constructor(private afs: AngularFirestore) {}

  getAcademies() {
    console.log('gonna fetch academies');
    // this.academies = this.afs.collection('academies').get();
    return this.afs.collection('academies').get();
  }
}
