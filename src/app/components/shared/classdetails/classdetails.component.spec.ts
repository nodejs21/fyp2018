import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassdetailsComponent } from './classdetails.component';

describe('ClassdetailsComponent', () => {
  let component: ClassdetailsComponent;
  let fixture: ComponentFixture<ClassdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
