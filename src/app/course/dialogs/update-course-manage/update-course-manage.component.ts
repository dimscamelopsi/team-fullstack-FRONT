import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseManageType } from '../../types/course-manage-type';
import { CourseService } from '../../services/course.service';
import { CourseHandlerComponent } from '../../course-handler/course-handler.component';
import { take } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { CourseListType } from '../../types/course-list-type';
import { CourseType } from '../../types/course-type';
import { CourseModel } from '../../models/course-model';

@Component({
  selector: 'app-update-course-manage',
  templateUrl: './update-course-manage.component.html',
  styleUrls: ['./update-course-manage.component.scss']
})
export class UpdateCourseManageComponent implements OnInit {
  public courses: Array<CourseManageType> = []
  public showAdd: boolean = false
  public manage: boolean = false
  @Input() public course!: CourseManageType

  constructor(
    private _courseService: CourseService,
    public dialogRef: MatDialogRef<CourseHandlerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) { }

  ngOnInit(): void {
    this._courseService.findListCourse()
      .pipe(take(1))
      .subscribe(
        (response: CourseManageType[]) => {this.courses = response})  
    this.showAdd = this.data.show
    this.manage = this.data.manage
  }

  onCourseToggle(course: CourseManageType): void {
    if (course.isSelected) {
      this.courses
        .filter((inCourse: CourseManageType) => inCourse.isSelected)
        .forEach((inCourse: CourseManageType) => {
          if (course.id !== inCourse.id) {
            inCourse.isSelected = false
            // Close all modules too...
            //inCourse.modules!.forEach((module: ModuleType) => module.selected = false)
          }
        })
    }
  }

  sendCourse(course: CourseManageType) {
    this.course = course
    this.dialogRef.close(this.course)
  }

  public delete(course: CourseManageType): void {
    this._courseService.remove(Number(course.id))
      .subscribe({
        next: (respons: HttpResponse<any>) => {
          this.courses.splice(
            this.courses.indexOf(course), 1 )}
      })
  }


}
