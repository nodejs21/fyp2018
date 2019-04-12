import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../utils/services/firestore/admin/admin.service';
import { AuthService } from '../../../../utils/services/auth/auth.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
  teachers;
  constructor(private _auth: AuthService, private _admin: AdminService) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this._admin.getTeachers().subscribe(teachers => {
        this.teachers = teachers;
        // console.log(this.groupByTeacherId(teachers, 'teacherId'));
        // console.log(teachers);
        // teachers.reduce((prev, current, index, teachers) => {
        //   var temp = [];
        //   console.log(prev, current);
        //   if (prev.data.techerId == current.data.teacherId)
        //     temp.push(teachers[index]);
        //   return current;
        // });
      });
    });
  }

  groupByTeacherId(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x['data'][key]] = rv[x['data'][key]] || []).push(x);
      return rv;
    }, []);
  }
}
