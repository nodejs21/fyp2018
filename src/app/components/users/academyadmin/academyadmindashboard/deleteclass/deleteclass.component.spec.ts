import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteclassComponent } from './deleteclass.component';

describe('DeleteclassComponent', () => {
  let component: DeleteclassComponent;
  let fixture: ComponentFixture<DeleteclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
