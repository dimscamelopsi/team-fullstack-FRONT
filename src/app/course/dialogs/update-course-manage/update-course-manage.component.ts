import { ChangeDetectorRef, Component, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CourseManageType } from '../../types/course-manage-type';
import { CourseService } from '../../services/course.service';
import { CourseHandlerComponent } from '../../course-handler/course-handler.component';
import { HttpResponse } from '@angular/common/http';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormCourseBuilderService } from '../../services/course-handler/form-course-builder.service';
import { ModuleType } from '../../types/module-type';

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
  //AJT COURSE HANDLER
  public form: FormGroup
  public useModule: boolean = true
  public module!: ModuleType
  public modules: Array<ModuleType> = []
  manageCourse!: string | null
  manageBln!: boolean
  publish!: boolean
  idCourse?: number

  constructor(
    private _courseService: CourseService,
    private _changeDetectorRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<CourseHandlerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseManageType, 
    private _formBuilder: FormCourseBuilderService) {
      this.form = this._formBuilder.form
     }

  ngOnInit(): void {
  }


  sendCourse(course: CourseManageType) {
    this.course = course
    this.dialogRef.close(this.course)
    this._changeDetectorRef.detectChanges()
  }

  public delete(course: CourseManageType): void {
    this._courseService.remove(Number(course.id))
      .subscribe({
        next: (respons: HttpResponse<any>) => {
          this.courses.splice(
            this.courses.indexOf(course), 1 )}
      })
  }

  //AJT FORM COURSE HANDLER

  get c(): {[key: string]: AbstractControl} {
    return this.form.controls
  }
  

  editSubmit(): void {
    const course: CourseManageType = {
      id: this.idCourse = this.data.id,
      title: this.c['title'].value,
      objective: this.c['objective'].value,
      publish: this.data.publish,
      isSelected: false 
    }
    
    this._courseService.update(course)
      .subscribe({
        next: (response: HttpResponse<any>) => { },
        error: (error: any) => {
          console.log(JSON.stringify(error))
        }})
    this.course = course
    this.dialogRef.close(this.course)
  }


  editPublish(state: boolean): boolean {
    return (state)? this.data.publish = false : this.data.publish =true
  }

  resetForm(event:any): void {
    event.preventDefault();
    this.modules = []
    this.c['title'].setValue('')
    this.c['objective'].setValue('')
  }

  
}
