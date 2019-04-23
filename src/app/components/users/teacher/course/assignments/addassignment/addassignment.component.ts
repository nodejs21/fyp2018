import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
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
  approvedRequests = [];
  buttonHidden = false;
  disableUploadButton = false;

  assignmentForm: FormGroup;

  constructor(
    private storage: AngularFireStorage,
    public dialogRef: MatDialogRef<AddassignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data = [],
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private _auth: AuthService,
    private _shared: SharedService
  ) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this._shared.getUserRequests().subscribe(user => {
        user['requests'].forEach(academy => {
          this._shared
            .getApprovedRequests(academy.academyId)
            .subscribe(request => {
              if (request.length > 0) {
                this.approvedRequests.push(request);
              }
            });
        });
      });
      this.teacherService.getClassesDetails(user.uid).subscribe(classes => {
        this.classes = classes;
        console.log('classes', classes);
      });
    });
    this.assignmentForm = this.formBuilder.group({
      academy: [''],
      class: [''],
      subject: [''],
      title: [''],
      totalMarks: [''],
      dueDate: [''],
      uploadedFile: ['']
    });
  }

  updateValues(request) {
    this.academy.setValue({
      academyname: request.data.academyName,
      academyid: request.data.academyId
    });
    this.class.setValue({
      className: request.data.className,
      classId: request.data.classId
    });
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

  get class() {
    return this.assignmentForm.get('class');
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

  createAssignment() {
    console.log(this.assignmentForm.value);
  }
}
