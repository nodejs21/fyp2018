import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherrequestsComponent } from './teacherrequests.component';

describe('TeacherrequestsComponent', () => {
  let component: TeacherrequestsComponent;
  let fixture: ComponentFixture<TeacherrequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherrequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
