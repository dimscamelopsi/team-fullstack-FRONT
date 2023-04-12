import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModuleAddComponent } from '../dialogs/module-add/module-add.component';
import { FormCourseBuilderService } from '../services/course-handler/form-course-builder.service';
import { CourseService } from '../services/course.service';
import { CourseType } from '../types/course-type';
import { ModuleType } from '../types/module-type';
import { ListComponent } from '../list/list.component';
import { CourseDialogComponent } from '../dialogs/course-dialog/course-dialog.component';
import { CourseListType } from '../types/course-list-type';

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
  public course!: CourseListType

  constructor(
    private _formBuilder: FormCourseBuilderService,
    private _courseService: CourseService,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    this.form = this._formBuilder.form
  }

  ngOnInit(): void {
  }

  get c(): {[key: string]: AbstractControl} {
    return this.form.controls
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
    const course: CourseType = {
      title: this.c['title'].value,
      objective: this.c['objective'].value,
      modules: this.modules,
    }
    this._courseService.add(course)
      .subscribe((courseType: CourseType) => {
        this._router.navigate(['/', 'course'])
      })
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

        console.log(result)

        this.modules = []
        this.c['title'].setValue(result.title)
        this.c['objective'].setValue(result.objective)

        for(this.module of result.modules!) {
          this.modules.push(this.module)
        }
      }
    })
  }

}
