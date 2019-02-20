import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmdeletionComponent } from './confirmdeletion.component';

describe('ConfirmdeletionComponent', () => {
  let component: ConfirmdeletionComponent;
  let fixture: ComponentFixture<ConfirmdeletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmdeletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmdeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
