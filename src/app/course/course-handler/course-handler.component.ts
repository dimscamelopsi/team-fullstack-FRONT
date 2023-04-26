import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModuleAddComponent } from '../dialogs/module-add/module-add.component';
import { FormCourseBuilderService } from '../services/course-handler/form-course-builder.service';
import { CourseService } from '../services/course.service';
import { CourseType } from '../types/course-type';
import { ModuleType } from '../types/module-type';
import { CourseDialogComponent } from '../dialogs/course-dialog/course-dialog.component';
import { CourseListType } from '../types/course-list-type';
import { UserService } from 'src/app/user/services/user.service';
import { ModuleDialogComponent } from '../dialogs/module-dialog/module-dialog.component';
import { ReallySimpleStudent } from 'src/app/student/types/really-simple-student';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-course-handler',
  templateUrl: './course-handler.component.html',
  styleUrls: ['./course-handler.component.scss'],
})
export class CourseHandlerComponent implements OnInit {
  public form: FormGroup;
  public useModule: boolean = true;
  public module!: ModuleType;
  public modules: Array<ModuleType> = [];
  public isPublished: boolean = true;

  constructor(
    private _formBuilder: FormCourseBuilderService,
    private _courseService: CourseService,
    private _router: Router,
    private _dialog: MatDialog,
    private _userService: UserService
  ) {
    this.form = this._formBuilder.form;
  }

  ngOnInit(): void {}

  get c(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  addModule(): void {
    this._dialog
      .open(ModuleAddComponent, {
        height: 'flex',
        width: 'flex',
      })
      .afterClosed()
      .subscribe((result: ModuleType | undefined) => {
        if (result !== undefined) {
          this.modules.push(result);
        }
      });
  }

  removeModule(module: ModuleType): void {
    this.modules.splice(this.modules.indexOf(module), 1);
  }

  onSubmit(): void {
    const student: ReallySimpleStudent = {
      id: this._userService.user.id,
    };

    this.modules.map((module: ModuleType) => {
      module.orderModule = this.modules.indexOf(module);
    });

    const course: CourseType = {
      title: this.c['title'].value,
      objective: this.c['objective'].value,
      modules: this.modules,
      publish: this.isPublished,
      student: student,
    };

    this._courseService.add(course).subscribe((courseType: CourseType) => {
      this._router.navigate(['/', 'conceptor', '/', 'list']);
    });
  }

  addCourse(): void {
    this._dialog
      .open(CourseDialogComponent, {
        data: {
          show: true,
        },
        height: 'flex',
        width: 'flex',
      })
      .afterClosed()
      .subscribe((result: CourseListType | undefined) => {
        if (result !== undefined) {
          this.modules = [];
          this.c['title'].setValue(result.title);
          this.c['objective'].setValue(result.objective);

          for (this.module of result.modules!) {
            this.modules.push(this.module);
          }
        }
      });
  }

  openModule(): void {
    this._dialog
      .open(ModuleDialogComponent, {
        height: 'flex',
        width: 'flex',
      })
      .afterClosed()
      .subscribe((result: ModuleType | undefined) => {
        if (result !== undefined) {
          this.modules.push(result);
        }
      });
  }

  publishHandler(event: Event): void {
    this.isPublished = !this.isPublished;
  }

  resetForm(event: any): void {
    event.preventDefault();
    this.modules = [];
    this.c['title'].setValue('');
    this.c['objective'].setValue('');
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.modules, event.previousIndex, event.currentIndex);
  }
}
