import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseManageType } from '../../types/course-manage-type';
import { CourseModel } from '../../models/course-model';
import { Observable, map } from 'rxjs';
import { AbstractControl, FormGroup } from '@angular/forms';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-update-course-manage',
  templateUrl: './update-course-manage.component.html',
  styleUrls: ['./update-course-manage.component.scss']
})
export class UpdateCourseManageComponent implements OnInit {
  private _course: CourseModel = new CourseModel()
  private _form: FormGroup = new FormGroup({})

  constructor(
    public dialogRef: MatDialogRef<UpdateCourseManageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseManageType ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public get c(): {[key: string]: AbstractControl} {
    return this._form.controls
  }


}
