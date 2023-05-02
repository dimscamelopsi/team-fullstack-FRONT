import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseManageDialogComponent } from './course-manage-dialog.component';

describe('CourseManageDialogComponent', () => {
  let component: CourseManageDialogComponent;
  let fixture: ComponentFixture<CourseManageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseManageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseManageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
