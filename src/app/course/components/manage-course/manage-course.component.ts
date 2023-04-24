import { Component, Input, OnInit } from '@angular/core';
import { CourseListType } from '../../types/course-list-type';
import { CourseService } from '../../services/course.service';
import { ToastService } from 'src/app/core/toast.service';
import { take } from 'rxjs';
import { ModuleType } from '../../types/module-type';
import { CourseManageType } from '../../types/course-manage-type';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCourseManageComponent } from '../../dialogs/update-course-manage/update-course-manage.component';
import { ModuleDialogComponent } from '../../dialogs/module-dialog/module-dialog.component';
import { ModuleManageDialogComponent } from '../../dialogs/module-manage-dialog/module-manage-dialog.component';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss']
})
export class ManageCourseComponent implements OnInit {
  courseEdit!: CourseManageType
  showCard: boolean = false;
  courseId!: CourseManageType

  public courses: Array<CourseManageType> = []
  
  constructor(
    public dialog: MatDialog,
    private _courseService: CourseService,
    private _router: Router) { }

  ngOnInit(): void {
    this._courseService.findListCourse()
      .pipe(take(1)).subscribe(
        (response: CourseManageType[]) => {this.courses = response })
  }

  openDialog(courseObject: CourseManageType): void {
    const dialogRef = this.dialog.open(UpdateCourseManageComponent, {
      data: {
        title: courseObject.title,
        objective: courseObject.objective,
        visibility: courseObject.publish, 
        modules: courseObject.modules
      }
    }).afterClosed().subscribe(
      (result) => { this.courseEdit = result })
  }

  openDialogModule(course: CourseManageType): void {
    const dialogRef = this.dialog.open(ModuleManageDialogComponent, {
      data: {
        modules: course.modules
      }
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

  showcard(course: CourseManageType): CourseManageType{
     return this.courseId = course
  }

}
