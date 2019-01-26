import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomcardComponent } from './classroomcard.component';

describe('ClassroomcardComponent', () => {
  let component: ClassroomcardComponent;
  let fixture: ComponentFixture<ClassroomcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
