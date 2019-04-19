import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'addassignment',
  templateUrl: './addassignment.component.html',
  styleUrls: ['./addassignment.component.css']
})
export class AddassignmentComponent implements OnInit {
  assignmentTitle = new FormControl();
  assignmentMarks = new FormControl();
  classes = [9, 10, 11, 12];
  selectedClass;
  subjects = ['Maths', 'Chemistry', 'Physics', 'Biology'];
  selectedSubjects;

  uploadedFile;

  constructor(
    private storage: AngularFireStorage,
    public dialogRef: MatDialogRef<AddassignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data = []
  ) {}

  ngOnInit() {}

  handler(e) {
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
            this.uploadedFile = dl;
            console.log(this.uploadedFile);
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
}
