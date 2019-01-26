import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachercardComponent } from './teachercard.component';

describe('TeachercardComponent', () => {
  let component: TeachercardComponent;
  let fixture: ComponentFixture<TeachercardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachercardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachercardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
