import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaService } from '../services/media.service';
import { ToastService } from 'src/app/core/toast.service';
import { take } from 'rxjs';
import {  HttpResponse } from '@angular/common/http';
import { MediaType } from 'src/app/course/types/media-type';
import { AddMediaType } from 'src/app/course/types/add-media-type';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})
export class AddMediaComponent implements OnInit {
  mediaFormGroup!: FormGroup;
  public mediaType!: MediaType[];
  public addMediaType!: AddMediaType[];


  constructor(
    private _fb: FormBuilder,
    private _mediaService: MediaService,
    private _toastService: ToastService,
    private _typeMediaService: MediaService,

  ) { }


  ngOnInit(): void {

    this.mediaFormGroup =this._fb.group({

      title: this._fb.control
      ("",
      [
        Validators.required,
      ]),
      summary: this._fb.control
      ("",
      [
        Validators.required,
      ]),
      duration: this._fb.control
      ("",
      [
        Validators.required,
      ]),
      url: this._fb.control
      ("",
      [
        Validators.required,

      ]),
      typeMedia: this._fb.control
      ("",
      [
        Validators.required,

      ]),
    })

  }
    public addMedia(){
      this._mediaService.add(this.mediaFormGroup.value)
      .pipe(
        take(1)
      ).subscribe({
        next: (response: HttpResponse<any>) => {
          const message: string = `media was added. `
          this._toastService.show(message)
        },
        error: (error: any) => {
          const badMessage: string = `media not added.`
          this._toastService.show(badMessage)
        }
      })
  }


}
