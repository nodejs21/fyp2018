import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyadminComponent } from './academyadmin.component';

describe('AcademyadminComponent', () => {
  let component: AcademyadminComponent;
  let fixture: ComponentFixture<AcademyadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
