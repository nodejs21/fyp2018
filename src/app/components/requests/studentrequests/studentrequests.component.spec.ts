import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentrequestsComponent } from './studentrequests.component';

describe('StudentrequestsComponent', () => {
  let component: StudentrequestsComponent;
  let fixture: ComponentFixture<StudentrequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentrequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
