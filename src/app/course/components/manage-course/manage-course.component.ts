import { Component, Input, OnInit } from '@angular/core';
import { CourseListType } from '../../types/course-list-type';
import { CourseService } from '../../services/course.service';
import { ToastService } from 'src/app/core/toast.service';
import { take } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ModuleType } from '../../types/module-type';
import { CourseManageType } from '../../types/course-manage-type';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss']
})
export class ManageCourseComponent implements OnInit {

  private _visibility!: boolean
  public courses: Array<CourseManageType> = []
  
  constructor(
    private _courseService: CourseService,
    private _toastService: ToastService) { }

  ngOnInit(): void {
    this._courseService.findListCourse()
      .pipe(take(1)).subscribe(
        (response: CourseManageType[]) => {this.courses = response })
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
    /*this._courseService.remove(course.id!)
      .pipe(take(1))
      .subscribe({
        next: (response: HttpResponse<any>) => {
           const message: string = `${course.title} was removed. ${course.modules!.length} modules were affected`
           this._toastService.show(message)
        },
        error: (error: any) => {
          const badMessage: string = `Sorry, ${course.title} was already removed`
          this._toastService.show(badMessage)
        },
        complete: () => {this.courses
          .splice(this.courses
            .indexOf(course),1 )}
      })*/

  }

  onVisibility(course: CourseManageType): void {
    //(course.publish)? course.publish = false : course.publish = true
    if(course.publish){
      course.publish = false
    }else {
      course.publish = true
    }
  }

}