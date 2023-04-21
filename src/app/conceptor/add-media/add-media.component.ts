import { Component, Directive, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaService } from '../services/media.service';
import { ToastService } from 'src/app/core/toast.service';
import { take } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { MediaType } from 'src/app/course/types/media-type';
import { AddMediaType } from 'src/app/course/types/add-media-type';
import { ModuleService } from '../services/module.service';
import { ModuleListType } from 'src/app/course/types/media-list-type';
import { TypeMediaType } from 'src/app/course/types/type-media-type';
import { TypeMediaService } from '../services/type-media.service';
import { log } from 'console';



@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})
export class AddMediaComponent implements OnInit {
  mediaFormGroup!: FormGroup;
  public mediaType!: MediaType[];
  public addMediaType!: AddMediaType[];
  public userModules: Array<ModuleListType> = [];
  public typeMedias: Array<TypeMediaType> = [];
  selectedOption = this.typeMedias[0];
  selectedFiles: File[] = [];
  mediaForm: any;


  constructor(
    private _fb: FormBuilder,
    private _mediaService: MediaService,
    private _toastService: ToastService,
    private _moduleService: ModuleService,
    private _typeMediaService: TypeMediaService,

  ) { }


  ngOnInit(): void {

    this._typeMediaService.getAllTypesMedia()
      .pipe(
        take(1)
      )
      .subscribe((response: TypeMediaType[]) => {

        this.typeMedias = response

      })

    this.mediaFormGroup = this._fb.group({

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
  public addMedia() {
/* console.log(this.mediaFormGroup.value) */
    this._mediaService.add(this.mediaFormGroup.value)
      .pipe(
        take(1)
      ).subscribe({
        next: (_response: HttpResponse<any>) => {
          const message: string = `media was added. `
          this._toastService.show(message)
          this.mediaFormGroup.reset(); // réinitialiser le formulaire
        },
        error: (_error: any) => {
          const badMessage: string = `media not added.`
          this._toastService.show(badMessage)
        }
      })
  }




onSubmit(): void {
  const formData = new FormData();
  for (let i = 0; i < this.selectedFiles.length; i++) {
    formData.append('file[]', this.selectedFiles[i], this.selectedFiles[i].name);
  }
  this.mediaFormGroup.reset();
  this.selectedFiles = [];
}

  /*  onFileSelected(event: any): void {
     for (let i = 0; i < event.target.files.length; i++) {
       this.selectedFiles.push(event.target.files[i]);
     }
   }

   onFileDropped(event: any): void {
     event.preventDefault();
     for (let i = 0; i < event.dataTransfer.files.length; i++) {
       this.selectedFiles.push(event.dataTransfer.files[i]);
     }
   }

   onDragOver(event: any): void {
     event.preventDefault();
   }

   uploadFile(evt: any){
     // evt est un tableau des fichier(s) déposés sur notre div. Ici nous supposerons qu'il y a un seul fichier uploadé

       let payload = new FormData();
       payload.append('data', evt[0]);
       // Nous pouvons maintenant uploader le fichier en lancant une requete POST avec la variable payload comme corps de requete :)
     } */

}
