import { Component, OnInit } from '@angular/core';
import { CourseListType } from '../../types/course-list-type';
import { CourseService } from '../../services/course.service';
import { take } from 'rxjs';
import { ModuleType } from '../../types/module-type';
import { CourseManageType } from '../../types/course-manage-type';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCourseManageComponent } from '../../dialogs/update-course-manage/update-course-manage.component';
import { HttpResponse } from '@angular/common/http';
import { ModuleService } from 'src/app/conceptor/modules/services/module.service';
import { ToastService } from 'src/app/core/toast.service';
import { Router } from '@angular/router';
import { UpdateModuleManageComponent } from '../../dialogs/update-module-manage/update-module-manage.component';
import { ModuleManageType } from '../../types/module-manage-type';
import { MediaType } from '../../types/media-type';
import { MediaService } from 'src/app/conceptor/modules/services/media.service';
import { AddModuleManageComponent } from '../../dialogs/add-module-manage/add-module-manage.component';
import { ModuleAddType } from 'src/app/course/types/module-add-type';



@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss']
})
export class ManageCourseComponent implements OnInit {
  courseEdit!: CourseManageType
  showCard: boolean = false;
  courseId!: CourseManageType
  isClicked!: boolean

  public courses: Array<CourseManageType> = []
  public modules: Array<ModuleType> = []
  public medias: Array<MediaType> = []


  public module!: ModuleType


  constructor(
    public dialog: MatDialog,
    private _router: Router,
    private _courseService: CourseService,
    private _toastService: ToastService,
    private _moduleService: ModuleService) { }



  ngOnInit(): void {
    this._courseService.findListCourse()
      .pipe(take(1)).subscribe(
        (response: CourseManageType[]) => { this.courses = response })
  }


  /**
  * Open the update course dialog.
  * @param courseObject The course object to update.
  */
  openDialog(courseObject: CourseManageType): void {
    this.dialog.open(UpdateCourseManageComponent, {
      data: {
        id: courseObject.id,
        title: courseObject.title,
        objective: courseObject.objective,
        publish: courseObject.publish,
        modules: courseObject.modules
      }
    }).afterClosed().subscribe(
      (result) => {
        courseObject.title = result.title
        courseObject.objective = result.objective
        courseObject.publish = result.publish
      })
  }


  /**
  * Open the update module dialog.
  * @param module The module object to update.
  * @param course The course object associated with the module.
  */
  openDialogModule(module: ModuleType, course: CourseManageType): void {
    this.dialog.open(UpdateModuleManageComponent, {
      height: 'flex',
      width: 'flex',
      data: {
        id: module.id,
        name: module.name,
        objective: module.objective,
        course: course
      }
    }).afterClosed().subscribe(
      (result) => {
        module.name = result.name
        module.objective = result.objective
        module.totalTime = result.totalTime
      }
    )

  }


  /**
 * Open the add module dialog.
 * @param course The course object to add a module to.
 */
  openDialogImportModule(course: CourseManageType): void {
    this.dialog.open(AddModuleManageComponent, {
      data: {
        id: course.id
      }
    }).afterClosed().subscribe(
      (result) => {
        if (result !== undefined) {
          course.modules?.push(result)
          this._moduleService.addModule(result).subscribe({
            next: (response: HttpResponse<any>) => {
              this._toastService.show('Module was added')
            },
            error: (error: any) => {
              console.log(JSON.stringify(error))
            }
          }
          )
        }

      }
    )
  }


  /**
 * Handle the course toggle event.
 * @param course The course object that was toggled.
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
  * Remove a course.
  * @param course The course object to remove.
  */
  doRemoveCourse(course: CourseManageType): void {
    this._courseService.remove(course.id!)
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
        complete: () => {
          this.courses
          .splice(this.courses
            .indexOf(course), 1)
        }
      })
  }

  /**
 * Remove a module.
 * @param module The module object to remove.
 */
  doRemoveModule(module: ModuleType): void {
    this._moduleService.remove(module.id!)
      .pipe(take(1))
      .subscribe({
        next: (response: HttpResponse<any>) => {
          const message: string = `The module ${module.name} has been removed.`
          this._toastService.show(message)
        },
        error: (error: any) => {
          const badMessage: string = `Sorry, ${module.name} was already removed`
          this._toastService.show(badMessage)
        },
        complete: () => {
          this.modules.splice(
            this.modules.indexOf(module), 1)
        }
      })
  }


  /**
 * Remove a module from the modules array.
 * @param module The module object to remove.
 */
  removeModule(module: ModuleType): void {
    this.modules.splice(
      this.modules.indexOf(module),
      1
    )
  }


  /**
 * Toggle the visibility of a course.
 * @param course The course object to toggle.
 */
  onVisibility(course: CourseManageType): void {
    //(course.publish)? course.publish = false : course.publish = true
    if (course.publish) {
      course.publish = false
    } else {
      course.publish = true
    }
  }


  /**
  * Show or hide the card and populate the modules array.
  * @param course The course object.
  * @returns The course object.
  */
  showcard(course: CourseManageType): CourseManageType {
    this.modules = course.modules!
    course.isSelected = !course.isSelected
    return this.courseId = course

  }

  showMedia(module: ModuleType) {
    module.selected = !module.selected
  }
}


