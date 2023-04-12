import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ToastService } from './../../core/toast.service';
import { CourseService } from '../services/course.service';
import { CourseListType } from '../types/course-list-type';
import { ModuleType } from '../types/module-type';
import { CourseHandlerComponent } from '../course-handler/course-handler.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public courses: Array<CourseListType> = []

  constructor(
    private _courseService: CourseService,
    private _toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this._courseService.findFullCourses()
      .pipe(
        take(1)
      )
      .subscribe((response: CourseListType[]) => {
        this.courses = response
      })
  }

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

  doRemoveCourse(course: CourseListType): void {
    this._courseService.remove(course.id!)
      .pipe(
        take(1)
      )
      .subscribe({
        next: (response: HttpResponse<any>) => {
           const message: string = `${course.title} was removed. ${course.modules!.length} modules were affected`
           this._toastService.show(message)
        },
        error: (error: any) => {
          const badMessage: string = `Sorry, ${course.title} was already removed`
          this._toastService.show(badMessage)
        },
        complete: () => {
          this.courses.splice(
            this.courses.indexOf(course),
            1
          )
        }
      })

  }
}
