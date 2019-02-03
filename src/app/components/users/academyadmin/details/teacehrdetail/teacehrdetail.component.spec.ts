import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacehrdetailComponent } from './teacehrdetail.component';

describe('TeacehrdetailComponent', () => {
  let component: TeacehrdetailComponent;
  let fixture: ComponentFixture<TeacehrdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacehrdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacehrdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
