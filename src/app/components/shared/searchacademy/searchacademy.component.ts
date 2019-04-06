import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TeacherService } from '../../../utils/services/firestore/teacher/teacher.service';
import { map, startWith, debounce, debounceTime, max } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SharedService } from '../../../utils/services/firestore/shared/shared.service';

@Component({
  selector: 'searchacademy',
  templateUrl: './searchacademy.component.html',
  styleUrls: ['./searchacademy.component.css']
})
export class SearchacademyComponent implements OnInit {
  academies: any = [];
  filteredOptions: Observable<string[]>;
  searchedAcademy = new FormControl();
  selectedAcademy: any;
  selectedAcademyId: any;
  selectedAcademyDetails: any = {};
  selectedClassId: any;
  selectedClassSubjects = [];
  pendingRequests = [];
  currentClassRequests = [];

  selectedSubjects = [];

  constructor(
    private _teacherService: TeacherService,
    public dialogRef: MatDialogRef<SearchacademyComponent>,
    public _shared: SharedService,
    @Inject(MAT_DIALOG_DATA) public data = []
  ) {}

  ngOnInit() {
    this._teacherService.getAcademies().subscribe(res => {
      this.academies = res.docs.map(doc => {
        return { data: doc.data(), id: doc.id };
      });
    });
    this.filteredOptions = this.searchedAcademy.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      map(value => this._filter(value))
    );
  }

  showAcademyDetails(academy) {
    this.selectedAcademy = academy;
    this._teacherService.getClassesDetails(academy.id).subscribe(classes => {
      this.selectedAcademyDetails.classes = classes;
    });
    this._teacherService.getSubjectsDetails(academy.id).subscribe(subjects => {
      this.selectedAcademyDetails.subjects = subjects;
    });
    this._shared.getPendingRequests(academy.id).subscribe(res => {
      // this.pendingRequests = res;
      res.docs.forEach(request => {
        this.pendingRequests.push(request.data().subjectId);
      });
      // this.pendingRequests = res.map(request => {
      //   return request.subjectId;
      // });
    });
  }

  showSubjects(classId) {
    this.selectedClassSubjects = [];
    if (this.selectedAcademyDetails.subjects) {
      this.selectedAcademyDetails.subjects.forEach(subject => {
        if (subject.data.classRef == classId) {
          this.selectedClassSubjects.push(subject);
        }
      });
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.academies.filter(option =>
      option.data.academyName.toLowerCase().includes(filterValue)
    );
  }

  closeDialog() {
    var result = [];
    var className;
    this.selectedAcademyDetails.classes.forEach(obj => {
      if (obj.classId === this.selectedClassId) {
        className = obj.data.className;
      }
    });
    for (var i = 0; i < this.selectedSubjects.length; i++) {
      var subjectName;
      this.selectedClassSubjects.forEach(subject => {
        if (subject.id === this.selectedSubjects[i]) {
          subjectName = subject.data.subjectName;
        }
      });
      result.push({
        academyId: this.selectedAcademy.id,
        classId: this.selectedClassId,
        subjectId: this.selectedSubjects[i],
        subjectName: subjectName,
        className: className,
        academyName: this.selectedAcademy.data.academyName
      });
    }

    this.dialogRef.close(result);
  }
}
