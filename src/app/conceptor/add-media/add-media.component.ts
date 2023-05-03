import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleType } from 'src/app/course/types/module-type';
import { environment } from 'src/environments/environment';
import { ModuleDialogComponent } from '../modules/module-dialog/module-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastService } from 'src/app/core/toast.service';
import {  ViewChild, ElementRef } from "@angular/core";
import { MediaService } from '../modules/services/media.service';



@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})

export class AddMediaComponent implements OnInit {

  @ViewChild("fileDropRef", { static: false }) fileDropEl!: ElementRef;
  files: any[] = [];
  mediaFormGroup!: FormGroup;
  selectedOption: any;
  public modules: Array<ModuleType> = [];
  //public module!: ModuleType
  public useModule: boolean = true;

  typeMedias = [
    { id: 1, title: 'Video' },
    { id: 3, title: 'Document' },
    { id: 2, title: 'Slide' }
  ];
  responseData: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _http: HttpClient,
    private _dialog: MatDialog,
    private _toastService: ToastService,
    private _mediaService: MediaService
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
      });
    }
  }

  addMedia() {
    const formData = this.createFormData();
    console.log(formData.get(module.id));

    this._mediaService.add(formData)
  .subscribe({

      next: (response :HttpResponse<any>)=> {
        //this.responseData = response;
        //const message: string = `Media `+ this.mediaFormGroup.controls['title'].value  + `was added in Module `
        const message = JSON.stringify(response)
       this._toastService.show(message)
      },
      error:(error: HttpResponse<any>) => {
        const badMessage: string = `Media not added !!! Never Ever !!`
        const message = JSON.stringify(error)
        this._toastService.show(message)
     /*    this._toastService.show(error) */
      }
  });

  }
  createFormData(): FormData {
    const formData = new FormData();
    formData.append('title' ,this.mediaFormGroup.controls['title'].value);
    formData.append('summary', this.mediaFormGroup.controls['summary'].value);
    formData.append('duration', this.mediaFormGroup.controls['duration'].value);
    formData.append('typeMedia', this.mediaFormGroup.controls['typeMedia'].value.title);
    formData.append('moduleId',this.modules[0].id?.toString()!)/* , this.mediaFormGroup.controls['module'].value.id) */;
    if (this.selectedOption && this.selectedOption.title === 'Video') {
      formData.append('url', this.mediaFormGroup.controls['url'].value);
    } else {
      formData.append('file', this.mediaFormGroup.controls['file'].value);
    }
    return formData;
  }




  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.mediaFormGroup.controls['file'].setValue(file);
    console.log ("test  j'ai ajouter un fichier")
  }

 /*  onSubmit() {
    if (this.mediaFormGroup.valid) {
      this.addMedia();
    }
  } */

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
          //this.module= this.modules[0]
        }
      });
  }


  removeModule(module: ModuleType): void {
    this.modules.splice(this.modules.indexOf(module), 1);
  }

 /**
   * on file drop handler
   */
 onFileDropped($event: any) {
  this.prepareFilesList($event);
}

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: any) {
    const file = event.target.files;
    this.prepareFilesList(file);
  }



  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files.length > index && this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index,);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.modules, event.previousIndex, event.currentIndex);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.fileBrowseHandler.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }
    /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
    formatBytes(bytes: any, decimals = 2) {
      if (bytes === 0) {
        return "0 Bytes";
      }
      const k = 1024;
      const dm = decimals <= 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }
}
