import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormCourseBuilderService } from '../services/course-handler/form-course-builder.service';
import { CourseService } from '../services/course.service';
import { CourseType } from '../types/course-type';

@Component({
  selector: 'app-course-handler',
  templateUrl: './course-handler.component.html',
  styleUrls: ['./course-handler.component.scss']
})
export class CourseHandlerComponent implements OnInit {
  public form: FormGroup

  constructor(
    private _formBuilder: FormCourseBuilderService,
    private _courseService: CourseService,
    private _router: Router
  ) { 
    this.form = this._formBuilder.form
  }

  ngOnInit(): void {
  }

  get c(): {[key: string]: AbstractControl} {
    return this.form.controls
  }

  onSubmit(): void {
    this._courseService.add(this.form.value)
      .subscribe((courseType: CourseType) => {
        this._router.navigate(['/', 'course'])
      })
  }

}
