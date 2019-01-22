import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancegraphComponent } from './attendancegraph.component';

describe('AttendancegraphComponent', () => {
  let component: AttendancegraphComponent;
  let fixture: ComponentFixture<AttendancegraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendancegraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendancegraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
