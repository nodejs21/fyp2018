import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TeacherService } from '../../../utils/services/firestore/teacher/teacher.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

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

  constructor(
    private _teacherService: TeacherService,
    public dialogRef: MatDialogRef<SearchacademyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this._teacherService.getAcademies().subscribe(res => {
      this.academies = res.docs.map(doc => {
        return { data: doc.data(), id: doc.id };
      });
      // res.forEach(doc => {
      //   console.log(doc);
      //   console.log(doc.data(), doc.id);
      // });
    });
    this.filteredOptions = this.searchedAcademy.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    console.log(this.academies);

    // this._teacherService.academies.subscribe(res => {
    //   this.academies = res;
    //   res.forEach(doc => {
    //     console.log(doc);
    //     console.log(doc.data(), doc.id);
    //   });
    // });
  }

  showAcademyDetails(academy) {
    console.log(academy);
    this._teacherService.getClassesDetails(academy.id).subscribe(snapshot => {
      snapshot.docs.map(doc => {
        this.selectedAcademyDetails.classes = doc.data();
      });
    });
    this._teacherService.getSubjectsDetails(academy.id).subscribe(snapshot => {
      snapshot.docs.map(doc => {
        this.selectedAcademyDetails.subjects = doc.data();
      });
    });
  }

  private _filter(value: string): string[] {
    // console.log(value);

    const filterValue = value.toLowerCase();

    return this.academies.filter(option =>
      option.data.academyName.toLowerCase().includes(filterValue)
    );
  }
}
