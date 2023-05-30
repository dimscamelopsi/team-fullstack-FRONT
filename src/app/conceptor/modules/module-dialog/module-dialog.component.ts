import { Component, Inject, OnInit } from '@angular/core';
import { ModuleType } from 'src/app/course/types/module-type';
import { AddMediaComponent } from '../../add-media/add-media.component';
import { ModuleService } from '../services/module.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from 'src/app/course/services/course.service';
import { take } from 'rxjs';
import { CourseListType } from 'src/app/course/types/course-list-type';

@Component({
  selector: 'app-module-dialog',
  templateUrl: './module-dialog.component.html',
  styleUrls: ['./module-dialog.component.scss']
})


export class ModuleDialogComponent implements OnInit {
  // public modules: Array<ModuleType> = []
  public module!: ModuleType
  public courses: Array<CourseListType> = []


  constructor(
    private _moduleService: ModuleService,
    public dialogRef: MatDialogRef<AddMediaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _courseService: CourseService

  ) { }

  ngOnInit(): void {
    // Fetch the list of courses
    this._courseService.findListCourse()
      .pipe(
        take(1)
      )
      .subscribe((response: any) => {
        this.courses = response
      })
  }

  /**
   * Add a module to the dialog and close it.
   * @param module The selected module
   */
  public addModule(module: ModuleType): void {
    this.module = module
    console.log(this.module)
    this.dialogRef.close(this.module)
  }
}
