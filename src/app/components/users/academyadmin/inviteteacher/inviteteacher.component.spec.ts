import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteteacherComponent } from './inviteteacher.component';

describe('InviteteacherComponent', () => {
  let component: InviteteacherComponent;
  let fixture: ComponentFixture<InviteteacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteteacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
