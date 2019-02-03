import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomresultComponent } from './classroomresult.component';

describe('ClassroomresultComponent', () => {
  let component: ClassroomresultComponent;
  let fixture: ComponentFixture<ClassroomresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
