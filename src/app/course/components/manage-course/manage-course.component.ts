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

  public courses: Array<CourseManageType> = []
  public modules: Array<ModuleType> = []
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
        (response: CourseManageType[]) => {this.courses = response })
  }

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

  openDialogImportModule(course: CourseManageType): void {
    this.dialog.open(AddModuleManageComponent, {
      data: {
        id: course.id
      }
    }).afterClosed().subscribe(
      (result) => { 
        if(result !== undefined){
          course.modules?.push(result)
          this._moduleService.addModule(result).subscribe({
            next: (response: HttpResponse<any>) => {
              this._toastService.show('Module was added')},
            error: (error: any) => {
              console.log(JSON.stringify(error))}}
          )
        }
        
       }
    )
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
        complete: () => {this.courses
          .splice(this.courses
            .indexOf(course),1 )}
      })
  }

  // verif 
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
            this.modules.indexOf(module),1 )
        }
      })
  }

  removeModule(module: ModuleType): void {
    this.modules.splice(
      this.modules.indexOf(module),
      1
    )
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
    this.modules = course.modules!
    course.isSelected = !course.isSelected
    return this.courseId = course
     
  }

  

}


