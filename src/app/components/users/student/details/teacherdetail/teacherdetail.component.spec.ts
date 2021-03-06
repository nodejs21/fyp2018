import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherdetailComponent } from './teacherdetail.component';

describe('TeacherdetailComponent', () => {
  let component: TeacherdetailComponent;
  let fixture: ComponentFixture<TeacherdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
