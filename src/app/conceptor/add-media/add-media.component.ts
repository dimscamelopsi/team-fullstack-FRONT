import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaService } from '../services/media.service';
import { ToastService } from 'src/app/core/toast.service';
import { take } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { MediaType } from 'src/app/course/types/media-type';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})
export class AddMediaComponent implements OnInit {
  mediaFormGroup!: FormGroup;
  public mediaType!: MediaType[];



  constructor(
    private _fb: FormBuilder,
    private _mediaService: MediaService,
    private _toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.mediaFormGroup =this._fb.group({
      title: this._fb.control,
      summary: this._fb.control,
      duration: this._fb.control,
      URL: this._fb.control,
      Mediatype: this._fb.control
      ("",
      [
        Validators.required,
        Validators.minLength(4)
      ]),
      objective: this._fb.control("",
      [
        Validators.required,
        Validators.minLength(4)
      ])
    })

  }
    public addMedia(){
      this._mediaService.add(this.mediaFormGroup.value)
      .pipe(
         take(1)
      ).subscribe({
        next: (response: HttpResponse<any>) =>{
          const message: string = `Media was created ! `
          this._toastService.show(message)
        },
        error: (error:any) => {
          const badMessage: string = `Media has not created !!! `
          this._toastService.show(badMessage)
        }

      })
    }


}
