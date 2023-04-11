import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleService } from '../services/module.service';
import { take } from 'rxjs';
import { CourseType } from 'src/app/course/types/course-type';
import { ToastService } from 'src/app/core/toast.service';
import { HttpResponse } from '@angular/common/http';
import { ModuleType } from '../types/module-type';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {
  moduleFormGroup!: FormGroup;
  public moduleType!: ModuleType[];

  constructor(

    private _fb: FormBuilder,
    private _moduleService: ModuleService,
    private _toastService: ToastService
  ) { }

  ngOnInit(): void {

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
        ])

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

}
