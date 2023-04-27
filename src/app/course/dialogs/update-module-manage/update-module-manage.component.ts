import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ModuleType } from '../../types/module-type';
import { ManageCourseComponent } from '../../components/manage-course/manage-course.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModuleService } from 'src/app/conceptor/modules/services/module.service';
import { HttpResponse } from '@angular/common/http';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormCourseBuilderService } from '../../services/course-handler/form-course-builder.service';
import { ModuleManageType } from '../../types/module-manage-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-module-manage',
  templateUrl: './update-module-manage.component.html',
  styleUrls: ['./update-module-manage.component.scss']
})
export class UpdateModuleManageComponent implements OnInit {

  public modules: Array<ModuleManageType> = []
  public form: FormGroup
  public module_id?: number
  private module!: ModuleManageType

  constructor(
    public dialogRef: MatDialogRef<ManageCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModuleManageType,
    private _moduleService: ModuleService,
    private _router: Router,
    private _formBuilder: FormCourseBuilderService,
    private _changeDetectorRef: ChangeDetectorRef) { 
      this.form = this._formBuilder.form
    }

  ngOnInit(): void {
  }


  sendModule(data: ModuleManageType) {
    this.module = data
    this.dialogRef.close(this.module)
    this._changeDetectorRef.detectChanges()
  }

  public delete(module: ModuleManageType): void {
    this._moduleService.remove(Number(module.id))
      .subscribe({
        next: (response: HttpResponse<any>) => {
          this.modules.splice(
            this.modules.indexOf(module), 1)
        }
      })
  }

  get c(): {[key: string]: AbstractControl} {
    return this.form.controls
  }

  editSubmit(): void {
    const module: ModuleManageType = {
      id: this.module_id = this.data.id,
      name: this.c['mane'].value,
      objective: this.c['objective'].value,
      totalTime: this.c['totalTime'].value,
      orderModule: this.c['orderModule'].value,
      selected: false,
      course: this.data.course
    }

    console.log(`Student was updated ${module}`)
    this._moduleService.update(module)
      .subscribe({
        next: (response: HttpResponse<any>) => {
          this._router.navigate(['/conceptor/manageCourse'])},
        error: (error: any) => {
          console.log(JSON.stringify(error))
        }})
  }

  resetForm(event:any): void {
    event.preventDefault();
    this.c['mane'].value,
    this.c['objective'].value,
    this.c['totalTime'].value,
    this.c['orderModule'].value
  }

}
