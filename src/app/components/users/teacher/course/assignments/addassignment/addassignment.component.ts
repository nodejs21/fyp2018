import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { TeacherService } from '../../../../../../utils/services/firestore/teacher/teacher.service';
import { AuthService } from '../../../../../../utils/services/auth/auth.service';
import { SharedService } from '../../../../../../utils/services/firestore/shared/shared.service';

@Component({
  selector: 'addassignment',
  templateUrl: './addassignment.component.html',
  styleUrls: ['./addassignment.component.css']
})
export class AddassignmentComponent implements OnInit {
  // assignmentTitle = new FormControl();
  // assignmentMarks = new FormControl();

  classes = [];
  selectedClass;
  subjects = [];
  selectedSubject;
  approvedRequests;
  buttonHidden = false;
  disableUploadButton = false;
  classrooms;

  assignmentForm: FormGroup;

  constructor(
    private storage: AngularFireStorage,
    public dialogRef: MatDialogRef<AddassignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data = [],
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private _auth: AuthService,
    private _shared: SharedService,
    private _teacher: TeacherService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._auth.user.subscribe(async user => {
      await this.getApprovedRequests().then(requests => {
        this.approvedRequests = requests;
        console.log(this.approvedRequests);
      });
    });
    // this._auth.user.subscribe(user => {
    //   this._shared.getUserRequests().subscribe(user => {
    //     if (!user['requests']) return;
    //     user['requests'].forEach(academy => {
    //       this._shared
    //         .getApprovedRequests(academy.academyId)
    //         .subscribe(request => {
    //           if (request.length > 0) {
    //             this.approvedRequests.push(request);
    //           }
    //         });
    //     });
    //   });
    //   // this.teacherService.getClassesDetails(user.uid).subscribe(classes => {
    //   //   this.classes = classes;
    //   //   console.log('classes', classes);
    //   // });
    // });
    this.assignmentForm = this.formBuilder.group({
      academy: ['', Validators.required],
      classRoom: ['', Validators.required],
      subject: ['', Validators.required],
      title: ['', Validators.required],
      totalMarks: ['', Validators.required],
      dueDate: ['', Validators.required],
      uploadedFile: [''],
      classRoomId: ['', Validators.required],
      classId: ['', Validators.required],
      teacher: ['', Validators.required]
    });
  }

  getApprovedRequests() {
    var temp = [];
    return new Promise((resolve, reject) => {
      {
        this._shared.getUserRequests().subscribe(userInfo => {
          if (!userInfo['requests']) return;
          userInfo['requests'].forEach(async request => {
            await this._shared
              .getApprovedRequests(request.academyId)
              .subscribe(request => {
                temp.push(request);
              });
          });
          resolve(temp);
        });
      }
    });
  }

  getAcademyData(academyId) {
    console.log(academyId);
    this._shared.getClassrooms(academyId).subscribe(classrooms => {
      this.classrooms = classrooms;
      console.log(this.classrooms);
    });
  }

  updateValues(classObj, academy) {
    console.log(classObj, academy);

    // this.academy.setValue(academy.data.academyName);
    this.classId.setValue(academy.data.classId);
    this.classRoom.setValue(classObj.data.class.className);
    this.classRoomId.setValue(classObj.id);
    this.teacher.setValue({
      teacherName: classObj.data.teacher.teacherName,
      teacherId: classObj.data.teacher.teacherId
    });
    // this.academy.setValue({
    //   academyname: classObj.data.academyName,
    //   academyid: classObj.data.academyId
    // });
    // this.class.setValue({
    //   className: classObj.data.className,
    //   classId: classObj.data.classId
    // });
  }

  handler(e) {
    this.disableUploadButton = true;
    this.buttonHidden = true;
    const file = e.target.files[0];

    const filePath = `assignments/${Date.now()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    // this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(dl => {
            this.uploadedFile.setValue(dl);
            console.log(this.uploadedFile);
            this.disableUploadButton = false;
            this.buttonHidden = false;
          });
        })
      )
      .subscribe();

    // file.thumbUrl = '';

    // const reader = new FileReader();
    // reader.onload = () => {
    //   file.thumbUrl = reader.result;
    //   console.log(reader.result);
    // };
    // this.uploadFirebaseStorage(file);
  }

  get academy() {
    return this.assignmentForm.get('academy');
  }

  get classRoom() {
    return this.assignmentForm.get('classRoom');
  }

  get subject() {
    return this.assignmentForm.get('subject');
  }

  get title() {
    return this.assignmentForm.get('title');
  }

  get totalMarks() {
    return this.assignmentForm.get('totalMarks');
  }

  get dueDate() {
    return this.assignmentForm.get('dueDate');
  }

  get uploadedFile() {
    return this.assignmentForm.get('uploadedFile');
  }

  get classRoomId() {
    return this.assignmentForm.get('classRoomId');
  }

  get teacher() {
    return this.assignmentForm.get('teacher');
  }

  get classId() {
    return this.assignmentForm.get('classId');
  }

  createAssignment() {
    console.log(this.assignmentForm.value);
    this._teacher
      .createAssignment(this.assignmentForm.value)
      .then(res => {
        console.log(res);
        this.showSnackBar(`Assignemt successfully uploaded!`);
        //! Push Notification To All Students Of This ClassRoom
      })
      .catch(error => console.error(error));
  }

  showSnackBar(message) {
    this.dialogRef.close();
    this._snackBar.open(message, 'X', { duration: 4000 });
  }
}
