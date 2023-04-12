import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { FormCourseBuilderService } from 'src/app/course/services/course-handler/form-course-builder.service';


@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']


})
export class AddMediaComponent implements OnInit {

  public form!: FormGroup;
  public mediaFormGroup!: FormGroup;
  public formModule!: FormsModule;
  public router!: Router;
  mediaService: any;
  _toastService: any;

  constructor(
    private formBuilder: FormCourseBuilderService
    ) {
      this.mediaFormGroup = this.formBuilder.form
     }

  ngOnInit(): void {

}

public addMedia() {
  this.mediaService.add(this.mediaFormGroup.value)
  .pipe(
    take(1)
  ).suscribe({
    next: (_Response: HttpResponse<any>) => {
      const message: string = `Media was added.`
      this._toastService.show(message)
    },
    error: (_error: any) => {
      const badMessage: string = `Media not added !!`
      this._toastService.show(badMessage)
    }
  })
}
/*this.mediaFormGroup = this.formBuilder.group({
  id: null,
  title: null,
  summary: null,
  duration: null,
  totalTime: null,
  createdAt: Date,
  url:null,
  typeMedia: null
});*/

onSubmitForm() {
  console.log(this.mediaFormGroup.value);
}

}
