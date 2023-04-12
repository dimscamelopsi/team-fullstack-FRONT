import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import {ReactiveFormsModule} from'@angular/forms';


@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']


})
export class AddMediaComponent implements OnInit {


 mediaForm!: FormGroup;
 router!: Router;
  mediaService: any;
  _toastService: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.mediaForm =this.formBuilder.group
    ({

      title: null,
      summary: null,
      duration: null,
      totalTime: null,
      createdAt: Date,
      url:null,
      typeMedia: null
    });
}

public addMedia() {
  this.mediaService.add(this.mediaForm.value)
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


onSubmitForm() {
  console.log(this.mediaForm.value);
}

}
