import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyadmindashboardComponent } from './academyadmindashboard.component';

describe('AcademyadmindashboardComponent', () => {
  let component: AcademyadmindashboardComponent;
  let fixture: ComponentFixture<AcademyadmindashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyadmindashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyadmindashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
