import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourseManageComponent } from './update-course-manage.component';

describe('UpdateCourseManageComponent', () => {
  let component: UpdateCourseManageComponent;
  let fixture: ComponentFixture<UpdateCourseManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCourseManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCourseManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
