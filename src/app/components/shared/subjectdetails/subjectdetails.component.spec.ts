import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectdetailsComponent } from './subjectdetails.component';

describe('SubjectdetailsComponent', () => {
  let component: SubjectdetailsComponent;
  let fixture: ComponentFixture<SubjectdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
