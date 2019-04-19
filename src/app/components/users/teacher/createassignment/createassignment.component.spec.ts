import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateassignmentComponent } from './createassignment.component';

describe('CreateassignmentComponent', () => {
  let component: CreateassignmentComponent;
  let fixture: ComponentFixture<CreateassignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateassignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
