import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentpopupComponent } from './assignmentpopup.component';

describe('AssignmentpopupComponent', () => {
  let component: AssignmentpopupComponent;
  let fixture: ComponentFixture<AssignmentpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
