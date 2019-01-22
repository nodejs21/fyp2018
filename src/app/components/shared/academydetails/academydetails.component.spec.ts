import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademydetailsComponent } from './academydetails.component';

describe('AcademydetailsComponent', () => {
  let component: AcademydetailsComponent;
  let fixture: ComponentFixture<AcademydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
