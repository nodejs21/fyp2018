import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademydetailComponent } from './academydetail.component';

describe('AcademydetailComponent', () => {
  let component: AcademydetailComponent;
  let fixture: ComponentFixture<AcademydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
