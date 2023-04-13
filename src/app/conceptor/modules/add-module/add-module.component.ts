import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleService } from '../services/module.service';
import { take } from 'rxjs';
import { ToastService } from 'src/app/core/toast.service';
import { HttpResponse } from '@angular/common/http';
import { ModuleType } from '../../types/module-type';
import { CourseService } from 'src/app/course/services/course.service';
import { CourseListType } from 'src/app/course/types/course-list-type';
import { MediaType } from 'src/app/course/types/media-type';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MediaDialogComponent } from '../media-dialog/media-dialog.component';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {
  moduleFormGroup!: FormGroup;
  public moduleType!: ModuleType[];
  public usercourses: Array<CourseListType> = []
  public medias: Array<MediaType> = []

  constructor(

    private _fb: FormBuilder,
    private _moduleService: ModuleService,
    private _toastService: ToastService,
    private _courseService: CourseService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this._courseService.findUsersCourses()
      .pipe(
        take(1)
      )
      .subscribe((response: CourseListType[]) => {

        this.usercourses = response
      })

    this.moduleFormGroup = this._fb.group({
      name: this._fb.control("",
        [
          Validators.required,
          Validators.minLength(4)
        ]),
      objective: this._fb.control("",
        [
          Validators.required,
          Validators.minLength(4)
        ]),
      course: this._fb.control(""),
      media: this._fb.control("")

    });
  }

  public addModule() {
    //console.log(this.courseFormGroup.value)
    this._moduleService.add(this.moduleFormGroup.value)
      .pipe(
        take(1)
      ).subscribe({
        next: (response: HttpResponse<any>) => {
          const message: string = `module was added. `
          this._toastService.show(message)
        },
        error: (error: any) => {
          const badMessage: string = `Module not added.`
          this._toastService.show(badMessage)
        }
      })
  }

  openMedia(): void {
    this._dialog.open(
      MediaDialogComponent,
      {
        height: 'flex',
        width: 'flex'
      }
    ).afterClosed().subscribe((result: MediaType | undefined) => {
      if (result !== undefined) {
          this.medias.push(result)
      }
    })
  }



}
