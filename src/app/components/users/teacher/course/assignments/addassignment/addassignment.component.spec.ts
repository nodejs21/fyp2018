import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddassignmentComponent } from './addassignment.component';

describe('AddassignmentComponent', () => {
  let component: AddassignmentComponent;
  let fixture: ComponentFixture<AddassignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddassignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
