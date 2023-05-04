import { Component, Inject, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/conceptor/modules/services/module.service';
import { take } from 'rxjs';
import { ModuleType } from '../../types/module-type';
import { ToastService } from 'src/app/core/toast.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseManageType } from '../../types/course-manage-type';
import { ManageCourseComponent } from '../../components/manage-course/manage-course.component';
import { CourseService } from '../../services/course.service';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-add-module-manage',
  templateUrl: './add-module-manage.component.html',
  styleUrls: ['./add-module-manage.component.scss']
})
export class AddModuleManageComponent implements OnInit {

  public courses: Array<CourseManageType> = []
  public modules: Array<ModuleType> = []
  private module!: ModuleType
  public moduleData: Array<ModuleType> = []

  constructor(
    public dialogRef: MatDialogRef<ManageCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseManageType,
    private _moduleService: ModuleService,) {
     }

  ngOnInit(): void {
    this._moduleService.findModulesByPersonId()
      .pipe(take(1)).subscribe(
        (response: ModuleType[]) => {this.modules = response
          this.modules = this.modules.filter((obj, index) => this.modules.findIndex((item) => item.name === obj.name) === index)
        })

  }

  public addModule(module: ModuleType, courseId: CourseManageType): void {
    module.course = courseId
    this.module = module
    this.dialogRef.close(this.module)
  }

  public listModule(): ModuleType[]{
    for(let course of this.courses){
      for(let moduleD of course.modules!){
         this.moduleData.push(moduleD)
      }
    }
    return this.moduleData
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
