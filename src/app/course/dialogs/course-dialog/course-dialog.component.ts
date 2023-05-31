import { Component, Inject, OnInit } from '@angular/core';
import { CourseListType } from '../../types/course-list-type';
import { CourseService } from '../../services/course.service';
import { ToastService } from 'src/app/core/toast.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseHandlerComponent } from '../../course-handler/course-handler.component';
import { take } from 'rxjs';
import { ModuleType } from '../../types/module-type';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent implements OnInit {

  public courses: Array<CourseListType> = []
  public showAdd: boolean = false
  public course!: CourseListType


  constructor(
    private _courseService: CourseService,
    private _toastService: ToastService,
    public dialogRef: MatDialogRef<CourseHandlerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    // Fetches the full list of courses
    this._courseService.findFullCourses()
      .pipe(
        take(1)
      )
      .subscribe((response: CourseListType[]) => {
        this.courses = response
      })
    this.showAdd = this.data.show
  }


  /**
  * Toggles the selection of a course and closes all its modules.
  * @param course - The course to toggle.
  */
  onCourseToggle(course: CourseListType): void {
    if (course.isSelected) {
      this.courses
        .filter((inCourse: CourseListType) => inCourse.isSelected)
        .forEach((inCourse: CourseListType) => {
          if (course.id !== inCourse.id) {
            inCourse.isSelected = false
            // Close all modules too...
            inCourse.modules!.forEach((module: ModuleType) => module.selected = false)
          }
        })
    }
  }


  /**
  * Sends the selected course and closes the dialog.
  * @param course - The selected course.
  */
  sendCourse(course: CourseListType) {
    this.course = course
    this.dialogRef.close(this.course)
  }
}
