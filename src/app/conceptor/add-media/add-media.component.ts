import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleType } from 'src/app/course/types/module-type';
import { environment } from 'src/environments/environment';
import { ModuleDialogComponent } from '../modules/module-dialog/module-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})



export class AddMediaComponent implements OnInit {



  mediaFormGroup!: FormGroup;
  selectedOption: any;
  public modules: Array<ModuleType> = [];

  typeMedias = [
    { id: 1, title: 'Video' },
    { id: 3, title: 'Document' },
    { id: 2, title: 'Slide' }
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _http: HttpClient,
    private _dialog: MatDialog,
    )
     {
  }


  ngOnInit(): void {

    {
      this.mediaFormGroup = this._formBuilder.group({
        title: this._formBuilder.control("", [Validators.required]),
        summary: this._formBuilder.control("", [Validators.required]),
        duration: this._formBuilder.control("", [Validators.required]),
        typeMedia: this._formBuilder.control("", [Validators.required]),
        url: this._formBuilder.control(""),
        file: this._formBuilder.control("" ),
        Module: this._formBuilder.control(""),
      });
    }
  }


  createFormData(): FormData {
    const formData = new FormData();
    formData.append('title' ,this.mediaFormGroup.controls['title'].value);
    formData.append('summary', this.mediaFormGroup.controls['summary'].value);
    formData.append('duration', this.mediaFormGroup.controls['duration'].value);
    formData.append('typeMedia', this.mediaFormGroup.controls['typeMedia'].value.title);
    formData.append('Module', this.mediaFormGroup.controls['Module'].value.id);
    if (this.selectedOption && this.selectedOption.title === 'Video') {
      formData.append('url', this.mediaFormGroup.controls['url'].value);
    } else {
      formData.append('file', this.mediaFormGroup.controls['file'].value);
    }
    return formData;
  }


  addMedia() {
    const formData = this.createFormData();
    this._http.post(`${environment.apiRootUri}media`,formData).subscribe({


      next: (response :any)=> {
        const message: string = `Media was added. `
        console.log(message);

        //this._toastService.show(message)
      },
      error:(error: any) => {
        const badMessage: string = `Media not added.`
        //this._toastService.show(badMessage)
      }
  });

  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.mediaFormGroup.controls['file'].setValue(file);
    console.log ("test  j'ai ajouter un fichier")
  }

  onSubmit() {
    if (this.mediaFormGroup.valid) {
      this.addMedia();
    }
  }

  openModule(): void {
    this._dialog
      .open(ModuleDialogComponent, {
        height: 'flex',
        width: 'flex',
      })
      .afterClosed()
      .subscribe((result: ModuleType | undefined) => {
        if (result !== undefined) {
          this.modules.push(result);
        }
      });
  }

}
