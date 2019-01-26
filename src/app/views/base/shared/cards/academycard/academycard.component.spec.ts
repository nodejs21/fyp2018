import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademycardComponent } from './academycard.component';

describe('AcademycardComponent', () => {
  let component: AcademycardComponent;
  let fixture: ComponentFixture<AcademycardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademycardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
