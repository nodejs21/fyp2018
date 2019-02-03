import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomdetailComponent } from './classroomdetail.component';

describe('ClassroomdetailComponent', () => {
  let component: ClassroomdetailComponent;
  let fixture: ComponentFixture<ClassroomdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
