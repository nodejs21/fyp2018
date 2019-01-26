import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectcardComponent } from './subjectcard.component';

describe('SubjectcardComponent', () => {
  let component: SubjectcardComponent;
  let fixture: ComponentFixture<SubjectcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
