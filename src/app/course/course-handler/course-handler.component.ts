import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleAddComponent } from '../dialogs/module-add/module-add.component';
import { FormCourseBuilderService } from '../services/course-handler/form-course-builder.service';
import { CourseService } from '../services/course.service';
import { CourseType } from '../types/course-type';
import { ModuleType } from '../types/module-type';
import { ListComponent } from '../list/list.component';
import { CourseDialogComponent } from '../dialogs/course-dialog/course-dialog.component';
import { CourseListType } from '../types/course-list-type';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/user/services/user.service';
import { ModuleDialogComponent } from '../dialogs/module-dialog/module-dialog.component';
import { SimpleStudent } from 'src/app/student/types/simple-student-type';
import { ReallySimpleStudent } from 'src/app/student/types/really-simple-student';
import { CourseManageType } from '../types/course-manage-type';
import { UpdateCourseManageComponent } from '../dialogs/update-course-manage/update-course-manage.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-handler',
  templateUrl: './course-handler.component.html',
  styleUrls: ['./course-handler.component.scss']
})
export class CourseHandlerComponent implements OnInit {
  public form: FormGroup
  public useModule: boolean = true
  public module!: ModuleType
  public modules: Array<ModuleType> = []
  manageCourse!: string | null
  manageBln!: boolean
  publish!: boolean
  idCourse?: number

  constructor(
    private _formBuilder: FormCourseBuilderService,
    private _courseService: CourseService,
    private _router: Router,
    private _routerManage: ActivatedRoute,
    private _dialog: MatDialog,
    private _userService: UserService
  ) {
    this.form = this._formBuilder.form
  }

  ngOnInit(): void {

  }

  get c(): {[key: string]: AbstractControl} {
    return this.form.controls
  }

  /**
   * La fonction permet de savoir si le user a clické sur le button manage course
   * pour modifier l'interface IHM
   * @returns boolean
   */
  manageBool(): boolean{
    this.manageCourse = this._routerManage.snapshot.queryParamMap.get('managerCourse')
    if( this.manageCourse === 'true'){return this.manageBln = true }
    else {return this.manageBln = false}
  }

  addModule(): void {
    this._dialog.open(
      ModuleAddComponent,
      {
        height: 'flex',
        width: 'flex'
      }
    ).afterClosed().subscribe((result: ModuleType | undefined) => {
      if (result !== undefined) {
        this.modules.push(result)
      }
    })
  }

  removeModule(module: ModuleType): void {
    this.modules.splice(
      this.modules.indexOf(module),
      1
    )
  }

  onSubmit(): void {
    const student: ReallySimpleStudent = {
      id: this._userService.user.id
    }


    const course: CourseType = {
      title: this.c['title'].value,
      objective: this.c['objective'].value,
      modules: this.modules,
      student: student

    }
    this._courseService.add(course)
      .subscribe((courseType: CourseType) => {
        this._router.navigate(['/', 'conceptor', '/', 'list'])
      })
  }

  editSubmit(): void {
    const course: CourseManageType = {
      id: this.idCourse,
      title: this.c['title'].value,
      objective: this.c['objective'].value,
      publish: this.publish,
      isSelected: false 
    }
    console.log(`Student was updated ${course}`)
    this._courseService.update(course)
      .subscribe({
        next: (response: HttpResponse<any>) => {
          this._router.navigate(['/'])
          console.log(`Student was updated ${response.status}`)},
        error: (error: any) => {
          console.log(JSON.stringify(error))
        }})
  }

  addCourse(): void {
    this._dialog.open(
      CourseDialogComponent,
      {
        data : {
          show : true
        },
        height: 'flex',
        width: 'flex'
      }
    ).afterClosed().subscribe((result: CourseListType | undefined) => {
      if (result !== undefined) {
        this.modules = []
        this.c['title'].setValue(result.title)
        this.c['objective'].setValue(result.objective)

        for(this.module of result.modules!) {
          this.modules.push(this.module)
        }
      }
    })
  }

  openModule(): void {
    this._dialog.open(
      ModuleDialogComponent,
      {
        height: 'flex',
        width: 'flex'
      }
    ).afterClosed().subscribe((result: ModuleType | undefined) => {
      if (result !== undefined) {
          this.modules.push(result)
      }
    })
  }

  addCourseManage(): void{
    this._dialog.open(UpdateCourseManageComponent, {
      height: '400px',
      width: '600px',
      data: {
        show : true,
        manage : true       
      }
    }).afterClosed().subscribe(
      (result: CourseManageType | undefined) => { 
        if(result !== undefined) {
          this.c['title'].setValue(result.title)
          this.c['objective'].setValue(result.objective)
          this.publish = result.publish
          this.idCourse = result.id
        }
      }
    )
  }

  editPublish(state: boolean): boolean {
    return (state)? this.publish = false : this.publish =true
  }

  resetForm(event:any): void {
    event.preventDefault();
    this.modules = []
    this.c['title'].setValue('')
    this.c['objective'].setValue('')
  }

}
